import { Injectable } from "@angular/core";
import { ISaveResponse } from "../shared/interfaces/saveResponse";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { HttpErrorResponse } from "@angular/common/http";
import { DBSyncService } from "./dbsync.service";
import { View } from "../shared/enums/view.enum";

@Injectable({
    providedIn: 'root'
})
export class DBService {
    constructor(private syncService: DBSyncService){}

    getList<T>(view: View, limit: number = null, desc: boolean = false, startKey: any = null, endKey: any = null): Promise<IQueryResponse<T>>{

        var criteria: any = {
            descending: desc,
            limit: limit
        };

        if (startKey)
            criteria.startkey = startKey;

        if (endKey)
            criteria.endkey = endKey;

        var response = this.query(view, criteria);

        return response ? response : Promise.resolve({ total_rows: 0, offset: 0, rows: [] });
    }

    getSingle<T>(id: string): Promise<T> {    
        return this.get(id);
    }

    insert(data: any): Promise<ISaveResponse> {
        data._id = this.generateID();
        return this.put(data);
    }

    update(id: string, rev: string, data: any): Promise<ISaveResponse> {
        data._id = id;
        data._rev = rev;
        return this.put(data);
    }

    private generateID(): string {
        return new Date().getTime().toString();
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = `An error occurred: ${err.error.message}`;
        console.error(errorMessage);
    }

    private get<T>(id: string): Promise<T> {
        return this.syncAndAction(db => db.get(id));
        // return this.syncService.getDB()
        //     .then(db => {
        //         return db ? db.get(id) : null;
        //     })
        //     .catch(err => {
        //         this.handleError(err);
        //         throw err;
        //     });
    }

    private query<T>(view: View, criteria: any): Promise<IQueryResponse<T>> {
        return this.syncAndAction(db => db.query(view.toString(), criteria));
        // return this.syncService.getDB()
        //     .then(db => {
        //         return db ? db.query(view.toString(), criteria) : null;
        //     })
        //     .catch(err => {
        //         this.handleError(err);
        //         throw err;
        //     });
    }

    private put(data: any): Promise<ISaveResponse> {
        return this.syncAndAction(db => db.put(data));
        // return this.syncService.getDB()
        //     .then(db => {
        //         return db ? db.put(data) : null;
        //     })
        //     .catch(err => {
        //         this.handleError(err);
        //         throw err;
        //     });
    }

    private syncAndAction(action: any): Promise<any> {
        return this.syncService.getDB()
        .then(db => {
            return db ? action(db) : null;
        })
        .catch(err => {
            this.handleError(err);
            throw err;
        });
    }
}