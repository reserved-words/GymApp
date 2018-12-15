import { Component } from "@angular/core";
import { IExercise } from "../shared/interfaces/exercise";
import { ExercisesService } from "./exercises.service";

@Component({
    selector: 'gym-exercises',
    templateUrl: 'exercises.component.html',
    styleUrls: [ 'exercises.component.css' ]
})
export class ExercisesComponent {
    pageTitle: string = 'Exercises';
    list: IExercise[] = [];

    constructor(private exercisesService: ExercisesService){
    }

    edit(): void {
        alert("Edit exercise!");
    }

    ngOnInit(): void {
        this.list = this.exercisesService.getExercises();
    }
}