import { ICurrentSet } from "./current-set";
import { IPlannedExercise } from "./planned-exercise";
import { Frequency } from "../enums/frequency.enum";

export interface ICurrentExercise {
    type: string;
    warmup: ICurrentSet[];
    sets: ICurrentSet[];
    minIncrement: number;
    done: boolean;
    nextSession: IPlannedExercise;
    nextSessionConfirmed: boolean;
}