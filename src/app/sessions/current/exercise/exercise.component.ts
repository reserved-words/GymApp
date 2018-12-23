import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";
import { SessionsHelper } from "src/app/shared/helpers/sessions.helper";
import { ICompletedExercise } from "src/app/shared/interfaces/completed-exercise";

@Component({
    selector: 'gym-current-exercise',
    templateUrl: 'exercise.component.html'
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
        this.sessionsHelper.addCurrentSet(this.exercise.warmup, this.exercise.type);
    }
    addSet(): void {
        this.sessionsHelper.addCurrentSet(this.exercise.sets, this.exercise.type);
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
        this.collapsed = true;
    }
    removeFromPlannedSession(){
        alert("Not implemented yet");
    }
    addPlannedWarmUpSet(): void {
        var warmups = this.exercise.nextSession.warmup;
        this.sessionsHelper.addSet(warmups, this.exercise.type);
    }
    removePlannedWarmUpSet(): void {
        var warmups = this.exercise.nextSession.warmup;
        this.sessionsHelper.removeSet(warmups, 0);
    }
    addPlannedSet(): void {
        var sets = this.exercise.nextSession.sets;
        this.sessionsHelper.addSet(sets, this.exercise.type);
    }
    removePlannedSet(): void {
        var sets = this.exercise.nextSession.sets;
        this.sessionsHelper.removeSet(sets, 1);
    }
}