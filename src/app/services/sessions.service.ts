import { ICompletedSession } from "../shared/interfaces/completed-session";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { IPlannedSession } from "../shared/interfaces/planned-session";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { ISession } from "src/app/shared/interfaces/session";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {

    constructor(private db: DBService, private http: HttpClient){}

    getNextSession(): Observable<IQueryResults<IPlannedSession>> {
        return this.http.get<IQueryResults<IPlannedSession>>(this.db.nextSessionUrl).pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.db.handleError)
        );
    }

    getCompletedSessions(): Observable<IQueryResults<ICompletedSession>>{
        return this.getSessions(this.db.completedSessionsUrl);
    };

    getCurrentSession(): Observable<IQueryResults<ICurrentSession>>{
        return this.getSessions(this.db.currentSessionUrl);
    }

    getPlannedSessions(): Observable<IQueryResults<IPlannedSession>>{
        return this.getSessions(this.db.plannedSessionsUrl);
    };

    getSession<T>(id: string): Observable<T> {    
        return this.http
            .get<T>(this.db.getDocumentUrl(id))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.db.handleError));
    }

    updateSession<T extends ISession>(id: string, session: T): Observable<ISaveResponse> {
        return this.http
            .put<ISaveResponse>(this.db.getDocumentUrl(id, session._rev), JSON.stringify(session))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.db.handleError));
    }

    insertSession(session: IPlannedSession): Observable<ISaveResponse> {
        return this.http
            .post<ISaveResponse>(this.db.baseUrl, JSON.stringify({ type: session.type, index: session.index, exercises: session.exercises }), {
                headers: {'Content-Type':'application/json; charset=utf-8'}
             })
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.db.handleError));
    }

    private getSessions<T>(url: string){
        return this.http.get<IQueryResults<T>>(url).pipe(
            tap(data => console.log("Add: " + JSON.stringify(data))),
            catchError(this.db.handleError)
        );
    }
}