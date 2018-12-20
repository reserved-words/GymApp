import { ICurrentExercise } from "./current-exercise";
import { ISession } from "./session";

export interface ICurrentSession extends ISession {
    started: Date;
    completed: Date;
    exercises: ICurrentExercise[];
}