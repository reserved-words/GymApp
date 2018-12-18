import { ICurrentExercise } from "./current-exercise";

export interface ICurrentSession {
    _id: number;
    started: Date;
    completed: Date;
    exercises: ICurrentExercise[];
}