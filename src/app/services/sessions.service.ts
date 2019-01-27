import { ICompletedSession } from "../shared/interfaces/completed-session";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
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
        super(db, authService);
    }

    getCompletedSessions(limit: number): Promise<IQueryResponse<ICompletedSession>>{
        return this.db.getList<ICompletedSession>(this.db.completedSessions, limit, true);
    };

    getLastSession(exerciseType: string): Promise<IQueryResponse<ICompletedExercise>>{
        return this.db.getList<ICompletedExercise>(this.db.completedExercises, 1, true, [exerciseType, {}], [exerciseType]);
    }

    getCurrentSession(): Promise<IQueryResponse<ICurrentSession>>{
        return this.db.getList<ICurrentSession>(this.db.currentSession);
    }

    getPlannedSessions(limit: number): Promise<IQueryResponse<IPlannedSession>>{
        return this.db.getList<IPlannedSession>(this.db.plannedSessions, limit);
    };

    getSession<T>(id: string): Promise<T> {    
        return this.db.getSingle<T>(id);
    }

    updateSession<T extends ISession>(id: string, session: T): Promise<ISaveResponse> {
        return this.db.update(id, session._rev, session);
    }

    insertSession(session: IPlannedSession): Promise<ISaveResponse> {
        return this.db.insert({ type: session.type, index: session.index, exercises: session.exercises });
    }
}