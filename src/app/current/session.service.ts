import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IPlannedSession } from "../shared/interfaces/planned-session";
import { IQueryResults } from "../shared/interfaces/queryResults";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    nextSessionUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/plannedSessions?limit=1';

    constructor(private http: HttpClient){}

    getNextSession(): Observable<IQueryResults<IPlannedSession>> {
        return this.http.get<IQueryResults<IPlannedSession>>(this.nextSessionUrl).pipe(
            tap(data => console.log(JSON.stringify(data))),
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