import { Injectable } from "@angular/core";
import { ISaveResponse } from "../shared/interfaces/saveResponse";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DBService {
    private localdb: PouchDB;
    private localdbname: string = 'gymapp-local';
    private baseUrl: string = ConfigService.settings.api.baseUrl;

    exercises: string = 'exerciseDesignDoc/exercises';
    completedSessions: string = 'sessionDesignDoc/completedSessions';
    completedExercises: string = 'sessionDesignDoc/completedExercises';
    plannedSessions: string = 'sessionDesignDoc/plannedSessions';
    currentSession: string = 'sessionDesignDoc/currentSession';
    weight: string = 'weight';
    maxWeight: string = 'sessionDesignDoc/sessionMaxWeight';
    totalWeight: string = 'sessionDesignDoc/sessionTotalWeight';

    constructor(private authService: AuthService, private router: Router){}

    getList<T>(view: string, limit: number = null, desc: boolean = null, startKey: any = null, endKey: any = null): Promise<IQueryResponse<T>>{

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

    sync(): void {
        if (!this.localdb){
            this.localdb = new PouchDB(this.localdbname);
        }
        var remotedb = this.baseUrl.replace('http://', ('http://' + this.authService.id() + '@'));
        var service = this;
        console.log('Syncing');
        var sync = PouchDB.sync(remotedb, this.localdbname, {
            live: false,
            retry: false
        }).on('change', function (info) {
            console.log('change: ' + JSON.stringify(info));
        }).on('paused', function (err) {
            console.log('sync paused');
            this.handleError(err);
        }).on('active', function () {
            console.log('active');
        }).on('denied', function (err) {
            console.log('sync denied');
            this.handleError(err);
        }).on('complete', function (info) {
            console.log('complete: ' + JSON.stringify(info));
        }).on('error', function (err) {
            console.log('sync error');
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
        else if (err.error instanceof ErrorEvent){
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
        return this.localdb.get(id)
            .then(r => {
                return r;
            })
            .catch(err => {
                this.handleError(err);
                throw err;
            });
    }

    private query<T>(view: string, criteria: any): Promise<IQueryResponse<T>> {
        return this.localdb.query(view, criteria)
            .then(r => {
                return r;
            })
            .catch(err => {
                this.handleError(err);
                throw err;
            });
    }

    private put(data: any): Promise<ISaveResponse> {
        return this.localdb.put(data)
        .then(r => {
            return r;
        })
        .catch(err => {
            this.handleError(err);
            throw err;
        });
    }
}