import { Injectable } from "@angular/core";
import { ISaveResponse } from "../shared/interfaces/saveResponse";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DBService {
    private localdb: PouchDB;
    private localdbname: string = 'gymapp-local';
    private baseUrl: string = ConfigService.settings.api.baseUrl;

    exercises: string = 'exercises';
    completedSessions: string = 'sessions/completed';
    completedExercises: string = 'exercises/completed';
    plannedSessions: string = 'sessions/planned';
    currentSession: string = 'sessions/current';
    weight: string = 'weight';
    maxWeight: string = 'sessions/max-weight';
    totalWeight: string = 'sessions/total-weight';

    constructor(private authService: AuthService, private router: Router){}

    getList<T>(view: string, limit: number = 50, desc: boolean = false, startKey: any = null, endKey: any = null): Promise<IQueryResponse<T>>{

        var criteria: any = {
            descending: desc,
            limit: limit
        };

        if (startKey)
            criteria.startkey = startKey;

        if (endKey)
            criteria.endkey = endKey;

        return this.query(view, criteria);
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

    sync(): Promise<void> {
        if (this.localdb)
            return Promise.resolve();
        
        this.localdb = new PouchDB(this.localdbname);
        var remotedb = this.baseUrl.replace('http://', ('http://' + this.authService.id() + '@'));
        var service = this;
        
        var opts = { live: true, retry: true };
        return this.localdb.replicate.from(remotedb)
            .on('complete', function(info) {
                service.localdb.sync(remotedb, opts)
                    .on('change', function (info) {
                        console.log('change: ' + JSON.stringify(info));
                    }).on('paused', function (info) {
                        console.log('paused: ' + JSON.stringify(info));
                    }).on('denied', function (err) {
                        console.log('sync denied');
                        this.handleError(err);
                    }).on('complete', function (info) {
                        console.log('complete: ' + JSON.stringify(info));
                    }).on('error', function (err) {
                        service.handleError(err);
                    });
            })
            .on('error', function (err) {
                service.handleError(err);
            });
    }

    private generateID(): string {
        return new Date().getTime().toString();
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.status === 401){
            this.authService.logout();
            this.router.navigate(['/login']); 
            return;
        }
    
        if (err.error instanceof ErrorEvent){
            // A client-side or network error occurred
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            // The back end returned an unsuccessful response code
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
    }

    private get<T>(id: string): Promise<T> {
        return this.sync()
            .then(r => this.localdb.get(id))
            .catch(err => {
                this.handleError(err);
                throw err;
            });
    }

    private query<T>(view: string, criteria: any): Promise<IQueryResponse<T>> {
        return this.sync()
            .then(r => this.localdb.query(view, criteria))
            .catch(err => {
                this.handleError(err);
                throw err;
            });
    }

    private put(data: any): Promise<ISaveResponse> {
        return this.sync()
            .then(() => this.localdb.put(data))
            .catch(err => {
                this.handleError(err);
                throw err;
            });
    }
}