import { ISet } from "src/app/shared/interfaces/set";

export interface IPlannedExercise {
    type: string;
    addBodyWeight: boolean;
    warmup: ISet[];
    sets: ISet[];
}