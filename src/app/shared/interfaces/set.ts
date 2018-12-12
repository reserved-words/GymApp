export interface ISet {
    reps: number;
    weight: number;
    done: boolean;
    increaseReps(): void;
    decreaseReps(): void;
    increaseWeight(): void;
    decreaseWeight(): void;
    markDone(): void;
}