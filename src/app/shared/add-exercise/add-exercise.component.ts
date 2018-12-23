import { Component, Output, EventEmitter } from "@angular/core";
import { ExercisesService } from "src/app/services/exercises.service";
import { IExercise } from "../interfaces/exercise";
import { Observable } from "rxjs";

@Component({
    selector: 'gym-add-exercise',
    templateUrl: 'add-exercise.component.html'
})
export class AddExerciseComponent{
    addExerciseType: string;
    exerciseToAdd: any;
    exercises: IExercise[];
    @Output() onAddExercise: EventEmitter<any> = new EventEmitter<any>();

    constructor(private exercisesService: ExercisesService){}

    ngOnInit(){
        this.subscribe(this.exercisesService.getExercises(), r => {
            this.exercises = r.rows.map(row => row.value);
        });
    }

    addExercise():void {
        var exerciseType = this.exercises.filter(ex => ex.name === this.addExerciseType)[0];
        // Get last instance of this exercise to determine warmups etc
        var ex = { type: exerciseType.name, warmup: [], sets: [], minIncrement: exerciseType.minIncrement };
        ex.sets.push({ quantity: 5, reps: 5, weight: exerciseType.minIncrement });
        this.addExerciseType = null;
        this.onAddExercise.emit(ex);
    }

    subscribe<T>(obs: Observable<T>, onSuccess: Function = null): void {
        obs.subscribe(
            response => { if (onSuccess){ onSuccess(response); }},
            error => alert(<any>error)
        );
    }
}