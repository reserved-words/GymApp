import { ICompletedExercise } from "./completed-exercise";
import { ISession } from "./session";

export interface ICompletedSession extends ISession {
    started: Date;
    completed: Date;
    exercises: ICompletedExercise[];
}