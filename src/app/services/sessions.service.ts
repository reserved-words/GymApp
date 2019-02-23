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
import { View } from "../shared/enums/view.enum";

@Injectable({
    providedIn: 'root'
})
export class SessionsService extends BaseService {

    constructor(private db: DBService, private authService: AuthService){
        super(db, authService);
    }

    getCompletedSessions(limit: number): Promise<IQueryResponse<ICompletedSession>>{
        return this.db.getList<ICompletedSession>(View.CompletedSessions, limit, true);
    };

    getLastInstance(exerciseType: string): Promise<IQueryResponse<ICompletedExercise>>{
        return this.db.getList<ICompletedExercise>(View.CompletedExercises, 1, true, [exerciseType, {}], [exerciseType]);
    }

    getCurrentSession(): Promise<IQueryResponse<ICurrentSession>>{
        return this.db.getList<ICurrentSession>(View.CurrentSession);
    }

    getPlannedSessions(limit: number): Promise<IQueryResponse<IPlannedSession>>{
        return this.db.getList<IPlannedSession>(View.PlannedSessions, limit);
    };

    getSession<T>(id: string): Promise<T> {    
        return this.db.getSingle<T>(id);
    }

    updateSession<T extends ISession>(id: string, session: T): Promise<ISaveResponse> {
        return this.db.update(id, session._rev, session);
    }

    updateSessions(current: ICurrentSession, planned: IPlannedSession[]): Promise<any[]> {
        let promiseArray = [];
        
        planned.forEach(session => {
            promiseArray.push(new Promise((resolve, reject) => {
                this.updateSession<IPlannedSession>(session._id, session).then(
                    response => {
                        session._rev = response.rev;
                        resolve();
                    });
            }));
        });

        if (current != null){
            promiseArray.push(new Promise((resolve, reject) => {
                this.updateSession<ICurrentSession>(current._id, current).then(
                    response => {
                        current._rev = response.rev;
                        resolve();
                    });
            }));    
        }

        return Promise.all(promiseArray);
    }

    insertSession(session: IPlannedSession): Promise<ISaveResponse> {
        return this.db.insert({ type: session.type, index: session.index, exercises: session.exercises });
    }
}