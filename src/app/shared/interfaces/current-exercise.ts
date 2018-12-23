import { ICurrentSet } from "./current-set";
import { IPlannedExercise } from "./planned-exercise";

export interface ICurrentExercise {
    type: string;
    warmup: ICurrentSet[];
    sets: ICurrentSet[];
    done: boolean;
    nextSession: IPlannedExercise;
    nextSessionConfirmed: boolean;
}