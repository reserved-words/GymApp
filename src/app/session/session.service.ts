import { Injectable } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { SessionExercise } from "../shared/model/session-exercise";
import { ExerciseSet } from "../shared/model/exercise-set";
import { Session } from "../shared/model/session";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    getSession(id: number): ISession {
        
        var session = new Session(1, new Date(), false);

        var bp = new SessionExercise("Bench Press", 2.5);
        bp.warmup = [
            new ExerciseSet(10,8,true),
            new ExerciseSet(15,5,true)
        ];

        bp.sets = [
            new ExerciseSet(20,5,true),
            new ExerciseSet(20,5,true),
            new ExerciseSet(20,5,false),
            new ExerciseSet(20,5,false),
            new ExerciseSet(20,5,false),
        ];

        session.exercises.push(bp);
        return session;
    } 
}