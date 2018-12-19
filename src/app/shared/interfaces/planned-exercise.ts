import { ISet } from "src/app/shared/interfaces/set";

export interface IPlannedExercise {
    type: string;
    warmup: ISet[];
    sets: ISet[];
    minIncrement: number;
}