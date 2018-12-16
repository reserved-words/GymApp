import { ISet } from "../interfaces/set";

export class ExerciseSet implements ISet {
    reps: number;    
    weight: number;
    done: boolean;
    constructor(w, r, d){
        this.reps = r;
        this.weight = w;
        this.done = d;
    }
    markDone(): void {
        this.done = true;
    }
    markNotDone(): void {
        this.done = false;
    }
}