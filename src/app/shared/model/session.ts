import { ISession } from "../interfaces/session";
import { ISessionExercise } from "../interfaces/session-exercise";
import { SessionExercise } from "./session-exercise";

export class Session implements ISession {
    id: number;    
    date: Date;
    exercises: ISessionExercise[] = [];
    complete: boolean;

    constructor(id: number, date: Date, complete: boolean){
        this.id = id;
        this.date = date;
        this.complete = complete;
    }
    
    addExercise():void {
        this.exercises.push(new SessionExercise("?"));
    }
    markComplete(): void {
        this.complete = true;
        for (var i in this.exercises){
            this.exercises[i].markFinished();
        }
    }
    markNotComplete(): void {
        this.complete = false;
    }
}