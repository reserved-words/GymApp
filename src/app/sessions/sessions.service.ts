import { Injectable } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    private sessionsUrl: string = 'api/sessions/sessions.json';

    constructor(private http: HttpClient){}

    getSessions(): Observable<ISession[]>{
        return this.http.get<ISession[]>(this.sessionsUrl).pipe(
            tap(data => console.log("Add: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
    };

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