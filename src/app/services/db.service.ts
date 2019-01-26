import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { throwError, Observable, of } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { ISaveResponse } from "../shared/interfaces/saveResponse";
import { tap, catchError } from "rxjs/operators";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as PouchDB from 'pouchdb/dist/pouchdb';

@Injectable({
    providedIn: 'root'
})
export class DBService {
    private db: PouchDB;
    private baseUrl: string = ConfigService.settings.api.baseUrl;

    exercisesUrl: string = 'exerciseDesignDoc/exercises';
    completedSessionsUrl: string = 'sessionDesignDoc/completedSessions';
    completedExercisesUrl: string = 'sessionDesignDoc/completedExercises';
    plannedSessionsUrl: string = 'sessionDesignDoc/plannedSessions';
    currentSessionUrl: string = 'sessionDesignDoc/currentSession';
    weightUrl: string = 'weight';
    maxWeightUrl: string = 'sessionDesignDoc/sessionMaxWeight';
    totalWeightUrl: string = 'sessionDesignDoc/sessionTotalWeight';

    constructor(private authService: AuthService){}

    private localdb(): PouchDB {
        if (!this.db){
            this.db = new PouchDB('gymapp-local');
            this.db.info().then(function (info) {
                console.log(info);
            });
            var remoteDB = this.baseUrl.replace('http://', ('http://' + this.authService.id() + '@'));
            console.log(remoteDB);
            var sync = PouchDB.replicate(remoteDB, 'gymapp-local', {
                live: false,
                retry: false
            }).on('change', function (info) {
                console.log('change: ' + JSON.stringify(info));
            }).on('paused', function (err) {
                console.log('paused: ' + JSON.stringify(err));
            }).on('active', function () {
                console.log('active');
            }).on('denied', function (err) {
                console.log('denied: ' + JSON.stringify(err));
            }).on('complete', function (info) {
                console.log('complete: ' + JSON.stringify(info));
            }).on('error', function (err) {
                console.log('error: ' + JSON.stringify(err));
            });
        }
        return this.db;
    }

    getList<T>(url: string, limit: number = null, desc: boolean = null, startKey: any = null, endKey: any = null): Promise<IQueryResults<T>>{

        var criteria: any;

        criteria = {
            descending: desc,
            limit: limit
        };

        if (startKey){
            criteria.startkey = startKey;
        }

        if (endKey){
            criteria.endkey = endKey;
        }

        return this.localdb().query(url, criteria);
    }

    getSingle<T>(id: string): Promise<T> {    
        return this.localdb().get(id);
    }

    find<T>(url: string, selector: any, sort: any, limit: number): Promise<IQueryResults<T>>{
        var criteria = {
            sort: sort,
            limit: limit
        };
        return this.localdb().find(url, criteria);
    }

    private generateID(): string {
        return new Date().getTime().toString();
    }

    insert(data: any): Promise<ISaveResponse> {
        data._id = this.generateID();
        return this.localdb().put(data);
    }

    update(id: string, rev: string, data: any): Promise<ISaveResponse> {
        data._id = id;
        data._rev = rev;
        return this.localdb().put(data);
    }

    handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.status === 401){
            errorMessage = 'unauthorized';     
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
        return throwError(errorMessage);    
    }
}