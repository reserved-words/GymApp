import { ISet } from "./set";

export interface IPlannedExercise {
    type: string;
    warmup: ISet[];
    sets: ISet[];
    minIncrement: number;
}