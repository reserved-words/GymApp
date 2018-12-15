import { ISessionExercise } from "../interfaces/session-exercise";
import { ISet } from "../interfaces/set";
import { ExerciseSet } from "./exercise-set";

export class SessionExercise implements ISessionExercise {
    type: string;    
    warmup: ISet[];
    sets: ISet[];
    constructor(t){
        this.type = t;
        this.warmup = [];
        this.sets = [];
    }
    addWarmUpSet(): void {
        if (this.warmup.length){
            var lastWarmUp = this.warmup[this.warmup.length-1];
            this.warmup.push(new ExerciseSet(lastWarmUp.weight,lastWarmUp.reps,false));
        }
        else {
            this.warmup.push(new ExerciseSet(0,0,false));
        }
    }
    addSet(): void {
        if (this.sets.length){
            var lastSet = this.sets[this.sets.length-1];
            this.sets.push(new ExerciseSet(lastSet.weight,lastSet.reps,false));
        }
        else if (this.warmup.length){
            var lastWarmUp = this.warmup[this.warmup.length-1];
            this.sets.push(new ExerciseSet(lastWarmUp.weight,lastWarmUp.reps,false));
        }
        else {
            this.sets.push(new ExerciseSet(0,0,false));
        }
    }
}