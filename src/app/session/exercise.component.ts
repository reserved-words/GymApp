import { Component, Input } from "@angular/core";
import { ISessionExercise } from "../shared/interfaces/session-exercise";


@Component({
    selector: 'gym-session-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class SessionExerciseComponent {
    @Input() exercise: ISessionExercise;
    @Input() sessionStatus: string;
    collapsed: boolean = true;

    addWarmUpSet(): void {
        if (this.exercise.warmup.length){
            var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
            this.exercise.warmup.push({ reps: lastWarmUp.reps, weight: lastWarmUp.weight, done: false });
        }
        else {
            this.exercise.warmup.push({ reps: 1, weight: 0, done: false });
        }
    }
    addSet(): void {
        if (this.exercise.sets.length){
            var lastSet = this.exercise.sets[this.exercise.sets.length-1];
            this.exercise.sets.push({ reps: lastSet.reps, weight: lastSet.weight, done: false });
        }
        else if (this.exercise.warmup.length){
            var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
            this.exercise.sets.push({ reps: lastWarmUp.reps, weight: lastWarmUp.weight, done: false });
        }
        else {
            this.exercise.sets.push({ reps: 1, weight: 0, done: false });
        }
    }
    markFinished() {
        this.exercise.finished = true;
        for (var i in this.exercise.warmup){
            this.exercise.warmup[i].done = true;
        }
        for (var i in this.exercise.sets){
            this.exercise.sets[i].done = true;
        }
    }
    markNotFinished() {
        this.exercise.finished = false;
    }
    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
}