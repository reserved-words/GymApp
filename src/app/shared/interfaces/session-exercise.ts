import { ISet } from "./set";

export interface ISessionExercise {
    type: string;
    warmup: ISet[];
    sets: ISet[];
    finished: boolean;
    addWarmUpSet(): void;
    addSet(): void;
    markFinished();
    markNotFinished();
}