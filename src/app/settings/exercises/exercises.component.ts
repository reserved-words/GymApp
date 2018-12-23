import { Component } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ExercisesService } from "../../services/exercises.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IQueryResults } from "src/app/shared/interfaces/queryResults";

@Component({
    selector: 'gym-exercises',
    templateUrl: 'exercises.component.html',
    styleUrls: [ 'exercises.component.css' ]
})
export class ExercisesComponent {
    pageTitle: string = 'Exercises';
    list: IExercise[] = [];
    errorMessage: string;

    constructor(private service: ExercisesService, private router: Router){
    }

    goToExercise(id: string) :void {
        this.router.navigate(['settings/exercises/' + id]);
    }

    ngOnInit(): void {
        this.subscribe(this.service.getExercises(), results => this.list = results);
    }

    subscribe<T>(obs: Observable<IQueryResults<T>>, onSuccess: Function): void {
        obs.subscribe(
            response => onSuccess(response.rows.map(r => r.value)),
            error => this.errorMessage = <any>error
        );
    }
}