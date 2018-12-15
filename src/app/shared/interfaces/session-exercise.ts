import { ISet } from "./set";

export interface ISessionExercise {
    type: string;
    warmup: ISet[];
    sets: ISet[];
    finished: boolean;
    minIncrement: number;
    addWarmUpSet(): void;
    addSet(): void;
    markFinished();
    markNotFinished();
}