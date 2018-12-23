import { ICompletedSession } from "../shared/interfaces/completed-session";
import { Observable } from "rxjs";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { IPlannedSession } from "../shared/interfaces/planned-session";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { ISession } from "src/app/shared/interfaces/session";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {

    constructor(private db: DBService){}

    getNextSession(): Observable<IQueryResults<IPlannedSession>> {
        return this.db.getList<IPlannedSession>(this.db.nextSessionUrl);
    }

    getCompletedSessions(): Observable<IQueryResults<ICompletedSession>>{
        return this.db.getList<ICompletedSession>(this.db.completedSessionsUrl);
    };

    getCurrentSession(): Observable<IQueryResults<ICurrentSession>>{
        return this.db.getList<ICurrentSession>(this.db.currentSessionUrl);
    }

    getPlannedSessions(): Observable<IQueryResults<IPlannedSession>>{
        return this.db.getList<IPlannedSession>(this.db.plannedSessionsUrl);
    };

    getSession<T>(id: string): Observable<T> {    
        return this.db.getSingle<T>(id);
    }

    updateSession<T extends ISession>(id: string, session: T): Observable<ISaveResponse> {
        return this.db.update(id, session._rev, session);
    }

    insertSession(session: IPlannedSession): Observable<ISaveResponse> {
        return this.db.insert({ type: session.type, index: session.index, exercises: session.exercises });
    }
}