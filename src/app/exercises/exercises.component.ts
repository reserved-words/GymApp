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
    errorMessage: string;

    constructor(private service: ExercisesService){
    }

    edit(): void {
        alert("Edit exercise!");
    }

    ngOnInit(): void {
        this.service.getExercises().subscribe(
            results => {
                for (var index in results.rows){
                    this.list.push(results.rows[index].value);
                }
            },
            error => this.errorMessage = <any>error
        );
    }
}