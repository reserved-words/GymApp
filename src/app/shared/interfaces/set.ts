export interface ISet {
    reps: number;
    weight: number;
    done: boolean;
    markDone(): void;
    markNotDone(): void;
}