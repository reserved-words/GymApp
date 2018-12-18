import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ICompletedSession } from "../shared/interfaces/completed-session";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    sessionUrl: string = 'http://127.0.0.1:5984/gymapp/';

    constructor(private http: HttpClient){}

    getSession(id: string): Observable<ICompletedSession> {        
        return this.http.get<ICompletedSession>(this.sessionUrl + id).pipe(
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