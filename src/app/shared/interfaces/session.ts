import { ISessionExercise } from "./session-exercise";

export interface ISession {
    _id: number;
    date: Date;
    exercises: ISessionExercise[];
    complete: boolean;
}