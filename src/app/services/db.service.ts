import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ISaveResponse } from "../shared/interfaces/saveResponse";
import { tap, catchError } from "rxjs/operators";
import { IQueryResults } from "../shared/interfaces/queryResults";

@Injectable({
    providedIn: 'root'
})
export class DBService {
    baseUrl: string = 'http://127.0.0.1:5984/gymapp/';

    exercisesUrl: string = this.baseUrl + '_design/exerciseDesignDoc/_view/exercises';
    nextSessionUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/plannedSessions?limit=1';
    completedSessionsUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/completedSessions';
    completedExercisesUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/completedExercises';
    plannedSessionsUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/plannedSessions?limit=3';
    currentSessionUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/currentSession';
    weightUrl: string = this.baseUrl + '_design/weight/_view/weight';

    constructor(private http: HttpClient){}

    getDocumentUrl(id: string, rev: string = null){
        return this.baseUrl + id + (rev ? ("?rev=" + rev) : "");
    }

    getList<T>(url: string, limit: number = null, desc: boolean = null){
        if (limit){
            url = url + "?" + (desc ? "descending=true&" : "") + "limit=" + limit;
        }
        else {
            url = url + (desc ? "?descending=true" : "");
        }
        return this.http.get<IQueryResults<T>>(url).pipe(
            tap(data => console.log("Add: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getSingle<T>(id: string): Observable<T> {    
        return this.http
            .get<T>(this.getDocumentUrl(id))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    find<T>(url: string, selector: any, sort: any, limit: number): Observable<IQueryResults<T>>{
        var criteria = {
            selector: selector,
            sort: sort,
            limit: limit
        };

        return this.http
            .post<IQueryResults<T>>(this.baseUrl, JSON.stringify(criteria), {
                headers: {'Content-Type':'application/json; charset=utf-8'}
             })
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    insert(data: any): Observable<ISaveResponse> {
        return this.http
            .post<ISaveResponse>(this.baseUrl, JSON.stringify(data), {
                headers: {'Content-Type':'application/json; charset=utf-8'}
             })
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    update(id: string, rev: string, data: any): Observable<ISaveResponse> {
        return this.http
            .put<ISaveResponse>(this.getDocumentUrl(id, rev), JSON.stringify(data))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
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