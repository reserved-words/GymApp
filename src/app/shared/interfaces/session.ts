import { ISessionExercise } from "./session-exercise";

export interface ISession {
    id: number;
    date: Date;
    exercises: ISessionExercise[];
    complete: boolean;

    addExercise():void;
    markComplete(): void;
    markNotComplete(): void;
}