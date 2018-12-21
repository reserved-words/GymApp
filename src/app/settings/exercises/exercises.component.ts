import { Component } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ExercisesService } from "../../services/settings/exercises.service";
import { QueryResultsHelper } from "../../shared/helpers/queryResults.helper";
import { Router } from "@angular/router";

@Component({
    selector: 'gym-exercises',
    templateUrl: 'exercises.component.html',
    styleUrls: [ 'exercises.component.css' ]
})
export class ExercisesComponent {
    pageTitle: string = 'Exercises';
    list: IExercise[] = [];
    errorMessage: string;

    constructor(private service: ExercisesService, private queryResultsHelper: QueryResultsHelper, private router: Router){
    }

    goToExercise(id: string) :void {
        this.router.navigate(['settings/exercises/' + id]);
    }

    ngOnInit(): void {
        this.service.getExercises().subscribe(
            results => this.list = this.queryResultsHelper.getValues(results),
            error => this.errorMessage = <any>error
        );
    }
}