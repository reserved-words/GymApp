import { ISet } from "./set";

export interface ICompletedExercise {
    type: string;
    addBodyWeight: boolean;
    warmup: ISet[];
    sets: ISet[];
}