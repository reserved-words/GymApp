import { ICompletedSession } from "../shared/interfaces/completed-session";
import { Observable } from "rxjs";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { IPlannedSession } from "../shared/interfaces/planned-session";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { ISession } from "src/app/shared/interfaces/session";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { ICompletedExercise } from "../shared/interfaces/completed-exercise";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class SessionsService extends BaseService {

    constructor(private db: DBService, private authService: AuthService){
        super(authService);
    }

    getCompletedSessions(limit: number): Observable<IQueryResults<ICompletedSession>>{
        return this.db.getList<ICompletedSession>(this.db.completedSessionsUrl, limit, true);
    };

    getLastSession(exerciseType: string): Observable<IQueryResults<ICompletedExercise>>{
        return this.db.find(
            this.db.completedExercisesUrl, 
            { "type": exerciseType },
            [ { started : "desc"} ],
            1);
    }

    getCurrentSession(): Observable<IQueryResults<ICurrentSession>>{
        return this.db.getList<ICurrentSession>(this.db.currentSessionUrl);
    }

    getPlannedSessions(limit: number): Observable<IQueryResults<IPlannedSession>>{
        return this.db.getList<IPlannedSession>(this.db.plannedSessionsUrl, limit);
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