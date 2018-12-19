import { ICompletedExercise } from "./completed-exercise";

export interface ICompletedSession {
    _id: number;
    started: Date;
    completed: Date;
    exercises: ICompletedExercise[];
}