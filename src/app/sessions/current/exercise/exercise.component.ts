import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";
import { SessionsHelper } from "src/app/shared/helpers/sessions.helper";
import { ICompletedExercise } from "src/app/shared/interfaces/completed-exercise";


@Component({
    selector: 'gym-current-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class CurrentExerciseComponent {
    @Input() exercise: ICurrentExercise;
    @Input() sessionStatus: string;
    @Output() removeFromSession: EventEmitter<string> = new EventEmitter<string>();
    collapsed: boolean = true;
    completedExercise: ICompletedExercise;

    constructor(private sessionsHelper: SessionsHelper){

    }

    ngOnInit(): void{
        if (this.exercise.done){
            this.completedExercise = this.sessionsHelper.convertCurrentToCompletedExercise(this.exercise);
        }
    }

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
    markDone() {
        this.exercise.done = true;
        for (var i in this.exercise.warmup){
            this.exercise.warmup[i].done = true;
        }
        for (var i in this.exercise.sets){
            this.exercise.sets[i].done = true;
        }
        this.exercise.nextSession = this.sessionsHelper.getNextSession(this.exercise);
        this.completedExercise = this.sessionsHelper.convertCurrentToCompletedExercise(this.exercise);
    }
    markNotDone() {
        this.exercise.done = false;
        this.exercise.nextSession = null;
        this.exercise.nextSessionConfirmed = false;
        this.completedExercise = null;
    }
    remove() {
        this.removeFromSession.emit(this.exercise.type);
    }
    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
    confirmPlannedSession() {
        this.exercise.nextSessionConfirmed = true;
    }
}