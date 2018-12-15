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
    increaseReps(): void {
        this.reps++;
    }
    decreaseReps(): void {
        this.reps--;
    }
    increaseWeight(): void {
        this.weight = this.weight + 2.5; // will need to set minimum increment from exercise type
    }
    decreaseWeight(): void {
        this.weight = this.weight - 2.5; // will need to set minimum increment from exercise type
    }
    markDone(): void {
        this.done = true;
    }
    markNotDone(): void {
        this.done = false;
    }
}