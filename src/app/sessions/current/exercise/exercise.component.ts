import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";
import { SessionPlanner } from "src/app/shared/helpers/session.planner";
import { ICompletedExercise } from "src/app/shared/interfaces/completed-exercise";
import { ExercisesService } from "src/app/services/exercises.service";
import { Icon } from "src/app/shared/enums/icon.enum";
import { SessionCompleter } from "src/app/shared/helpers/session.completer";
import { SessionHelper } from "src/app/shared/helpers/session.helper";

@Component({
    selector: 'gym-current-exercise',
    templateUrl: 'exercise.component.html'
})
export class CurrentExerciseComponent {
    Icon = Icon;
    @Input() exercise: ICurrentExercise;
    @Input() sessionStatus: string;
    @Output() removeFromSession: EventEmitter<string> = new EventEmitter<string>();
    collapsed: boolean = true;
    completedExercise: ICompletedExercise;
    minIncrement: number;
    
    constructor(private helper: SessionHelper, private service: ExercisesService, private completer: SessionCompleter){}

    ngOnInit(): void{
        if (this.exercise.done){
            this.completedExercise = this.completer.convertCurrentToCompletedExercise(this.exercise);
        }
        console.log('ngOnInit');
        this.service.getExercises().then(response => {
            console.log(response);
            this.minIncrement = response.rows.map(r => r.value).filter(r => r.name === this.exercise.type)[0].minIncrement;
        });
    }

    addWarmUpSet(): void {
        this.helper.addCurrentSet(this.exercise.warmup, this.exercise.type);
    }
    addSet(): void {
        this.helper.addCurrentSet(this.exercise.sets, this.exercise.type);
    }
    markDone() {
        this.exercise.done = true;
        for (var i in this.exercise.warmup){
            this.exercise.warmup[i].done = true;
        }
        for (var i in this.exercise.sets){
            this.exercise.sets[i].done = true;
        }
        this.exercise.nextSession = this.helper.getNextSession(this.exercise);
        this.completedExercise = this.completer.convertCurrentToCompletedExercise(this.exercise);
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
        this.helper.addSet(warmups, this.exercise.type);
    }
    removePlannedWarmUpSet(): void {
        var warmups = this.exercise.nextSession.warmup;
        this.helper.removeSet(warmups, 0);
    }
    addPlannedSet(): void {
        var sets = this.exercise.nextSession.sets;
        this.helper.addSet(sets, this.exercise.type);
    }
    removePlannedSet(): void {
        var sets = this.exercise.nextSession.sets;
        this.helper.removeSet(sets, 1);
    }
}