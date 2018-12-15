import { ISessionExercise } from "../interfaces/session-exercise";
import { ISet } from "../interfaces/set";
import { ExerciseSet } from "./exercise-set";

export class SessionExercise implements ISessionExercise {
    finished: boolean;
    type: string;    
    warmup: ISet[];
    sets: ISet[];
    minIncrement: number;
    constructor(t, minIncrement: number){
        this.type = t;
        this.warmup = [];
        this.sets = [];
        this.minIncrement = minIncrement;
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
    markFinished() {
        this.finished = true;
        for (var i in this.warmup){
            this.warmup[i].markDone();
        }
        for (var i in this.sets){
            this.sets[i].markDone();
        }
    }
    markNotFinished() {
        this.finished = false;
    }
}