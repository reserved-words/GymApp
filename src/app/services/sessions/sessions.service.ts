import { Injectable } from "@angular/core";
import { ICompletedSession } from "../../shared/interfaces/completed-session";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IQueryResults } from "../../shared/interfaces/queryResults";
import { IPlannedSession } from "../../shared/interfaces/planned-session";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    private completedSessionsUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/completedSessions?descending=true&limit=3';
    private plannedSessionsUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/plannedSessions?limit=3';

    constructor(private http: HttpClient){}

    getCompletedSessions(): Observable<IQueryResults<ICompletedSession>>{
        return this.getSessions(this.completedSessionsUrl);
    };

    getPlannedSessions(): Observable<IQueryResults<IPlannedSession>>{
        return this.getSessions(this.plannedSessionsUrl);
    };

    private getSessions<T>(url: string){
        return this.http.get<IQueryResults<T>>(url).pipe(
            tap(data => console.log("Add: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
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