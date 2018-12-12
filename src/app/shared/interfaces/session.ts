import { ISessionExercise } from "./session-exercise";

export interface ISession {
    id: number;
    date: Date;
    exercises: ISessionExercise[];
}