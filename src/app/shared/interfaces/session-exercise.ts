import { ISet } from "./set";

export interface ISessionExercise {
    type: string;
    warmup: ISet[];
    sets: ISet[];
    addWarmUpSet(): void;
    addSet(): void;
}