import { ISet } from "./set";

export interface ICompletedExercise {
    type: string;
    warmup: ISet[];
    sets: ISet[];
}