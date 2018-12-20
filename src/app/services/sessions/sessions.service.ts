import { Injectable } from "@angular/core";
import { ICompletedSession } from "../../shared/interfaces/completed-session";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IQueryResults } from "../../shared/interfaces/queryResults";
import { IPlannedSession } from "../../shared/interfaces/planned-session";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { ISession } from "src/app/shared/interfaces/session";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    private nextSessionUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/plannedSessions?limit=1';
    private completedSessionsUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/completedSessions?descending=true&limit=3';
    private plannedSessionsUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/plannedSessions?limit=3';
    private currentSessionUrl: string = 'http://127.0.0.1:5984/gymapp/_design/sessionDesignDoc/_view/currentSession';
    private documentUrl: string = 'http://127.0.0.1:5984/gymapp/';

    constructor(private http: HttpClient){}

    getNextSession(): Observable<IQueryResults<IPlannedSession>> {
        return this.http.get<IQueryResults<IPlannedSession>>(this.nextSessionUrl).pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getCompletedSessions(): Observable<IQueryResults<ICompletedSession>>{
        return this.getSessions(this.completedSessionsUrl);
    };

    getCurrentSession(): Observable<IQueryResults<ICurrentSession>>{
        return this.getSessions(this.currentSessionUrl);
    }

    getPlannedSessions(): Observable<IQueryResults<IPlannedSession>>{
        return this.getSessions(this.plannedSessionsUrl);
    };

    getSession<T>(id: string): Observable<T> {    
        return this.http
            .get<T>(this.documentUrl + id)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    saveSession<T extends ISession>(id: string, session: T): Observable<ISaveResponse> {
        return this.http
            .put<ISaveResponse>(this.documentUrl + id + "?rev=" + session._rev, JSON.stringify(session))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));    
    }

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