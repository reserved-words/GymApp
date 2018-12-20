import { IPlannedExercise } from "./planned-exercise";
import { ISession } from "./session";

export interface IPlannedSession extends ISession {
    // _rev: string;
    index: number;
    exercises: IPlannedExercise[];
}