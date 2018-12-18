import { IPlannedExercise } from "./planned-exercise";

export interface IPlannedSession {
    _id: number;
    index: number;
    exercises: IPlannedExercise[];
}