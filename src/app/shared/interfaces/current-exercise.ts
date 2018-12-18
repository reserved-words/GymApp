import { ICurrentSet } from "./current-set";

export interface ICurrentExercise {
    type: string;
    warmup: ICurrentSet[];
    sets: ICurrentSet[];
    minIncrement: number;
    done: boolean;
}