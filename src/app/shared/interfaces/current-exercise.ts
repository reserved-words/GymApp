import { ICurrentSet } from "./current-set";
import { IPlannedExercise } from "./planned-exercise";

export interface ICurrentExercise {
    type: string;
    addBodyWeight: boolean;
    warmup: ICurrentSet[];
    sets: ICurrentSet[];
    done: boolean;
    nextSession: IPlannedExercise;
    nextSessionConfirmed: boolean;
}