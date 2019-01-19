import { IPlannedExercise } from "./planned-exercise";
import { ISession } from "./session";

export interface IPlannedSession extends ISession {
    index: number;
    exercises: IPlannedExercise[];
}