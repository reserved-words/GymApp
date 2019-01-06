import { Component, Output, EventEmitter } from "@angular/core";
import { ExercisesService } from "src/app/services/exercises.service";
import { IExercise } from "../../interfaces/exercise";
import { Observable } from "rxjs";
import { SessionsService } from "src/app/services/sessions.service";
import { SessionsHelper } from "../../helpers/sessions.helper";

@Component({
    selector: 'gym-add-exercise',
    templateUrl: 'add-exercise.component.html'
})
export class AddExerciseComponent{
    addExerciseType: string;
    exerciseToAdd: any;
    exercises: IExercise[];
    @Output() onAddExercise: EventEmitter<any> = new EventEmitter<any>();

    constructor(private exercisesService: ExercisesService, private sessionsService: SessionsService, private helper: SessionsHelper){}

    ngOnInit(){
        this.subscribe(this.exercisesService.getExercises(), r => {
            this.exercises = r.rows.map(row => row.value);
        });
    }

    addExercise():void {
        var exerciseType = this.exercises.filter(ex => ex.name === this.addExerciseType)[0];
        this.subscribe(this.sessionsService.getLastSession(this.addExerciseType), r => 
        {
            var lastSession = r.total_rows > 0
                ? r.rows.map(r => r.value)[0]
                : null;
            var plannedExercise = this.helper.convertCompletedToPlannedExercise(lastSession, exerciseType);
            this.addExerciseType = null;
            this.onAddExercise.emit(plannedExercise);
        });
    }

    subscribe<T>(obs: Observable<T>, onSuccess: Function = null): void {
        obs.subscribe(
            response => { if (onSuccess){ onSuccess(response); }},
            error => alert(<any>error)
        );
    }
}