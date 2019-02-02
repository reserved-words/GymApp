import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ISaveResponse } from "../shared/interfaces/saveResponse";
import { tap, catchError } from "rxjs/operators";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class DBService {
    baseUrl: string = ConfigService.settings.api.baseUrl;

    authenticateUrl: string = this.baseUrl + '_session/';
    exercisesUrl: string = this.baseUrl + '_design/exerciseDesignDoc/_view/exercises';
    completedSessionsUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/completedSessions';
    completedExercisesUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/completedExercises';
    plannedSessionsUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/plannedSessions';
    currentSessionUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/currentSession';
    weightUrl: string = this.baseUrl + '_design/weight/_view/weight';
    maxWeightUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/sessionMaxWeight';
    totalWeightUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/sessionTotalWeight';

    constructor(private http: HttpClient, private authService: AuthService, private router: Router){}

    private getAuthHeader(): string {
        return 'Basic ' + this.authService.id();
    }

    getDocumentUrl(id: string, rev: string = null){
        return this.baseUrl + id + (rev ? ("?rev=" + rev) : "");
    }

    getList<T>(url: string, limit: number = null, desc: boolean = null, startKey: any = null, endKey: any = null){
        url = url + "?descending=" + (desc ? "true" : "false");
        if (limit){
            url = url + "&limit=" + limit;
        }
        if (startKey){
            url = url + "&startkey=" + JSON.stringify(startKey);
        }
        if (endKey){
            url = url + "&endkey=" + JSON.stringify(endKey);
        }
        return this.http.get<IQueryResponse<T>>(url, {
            headers: {'Authorization': this.getAuthHeader()}
        }).pipe(catchError(this.handleError));
    }

    getSingle<T>(id: string): Observable<T> {    
        return this.http
            .get<T>(this.getDocumentUrl(id), {
                headers: {'Authorization': this.getAuthHeader()}
            })
            .pipe(catchError(this.handleError));
    }

    find<T>(url: string, selector: any, sort: any, limit: number): Observable<IQueryResponse<T>>{
        var criteria = {
            selector: selector,
            sort: sort,
            limit: limit
        };

        return this.http
            .post<IQueryResponse<T>>(this.baseUrl, JSON.stringify(criteria), {
                headers: {'Content-Type':'application/json; charset=utf-8', 'Authorization': this.getAuthHeader()}
             })
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    insert(data: any): Observable<ISaveResponse> {
        return this.http
            .post<ISaveResponse>(this.baseUrl, JSON.stringify(data), {
                headers: {'Content-Type':'application/json; charset=utf-8;', 'Authorization': this.getAuthHeader()}
             })
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    update(id: string, rev: string, data: any): Observable<ISaveResponse> {
        return this.http
            .put<ISaveResponse>(this.getDocumentUrl(id, rev), JSON.stringify(data), {
                headers: {'Authorization': this.getAuthHeader()}
            })
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
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