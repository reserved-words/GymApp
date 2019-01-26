import { Component } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ExercisesService } from "../../services/exercises.service";
import { Router } from "@angular/router";
import { Icon } from "../../shared/enums/icon.enum";

@Component({
    selector: 'gym-exercises',
    templateUrl: 'exercises.component.html',
    styleUrls: [ 'exercises.component.css' ]
})
export class ExercisesComponent {
    Icon = Icon;
    pageTitle: string = 'Exercises';
    list: IExercise[] = [];
    errorMessage: string;

    constructor(private service: ExercisesService, private router: Router){
    }

    goToExercise(id: string): void {
        this.router.navigate(['settings/exercises/' + id]);
    }

    addNewExercise(): void {
        this.router.navigate(['settings/exercises/new']);
    }

    ngOnInit(): void {
        this.service.subscribe(this.service.getExercises(), results => this.list = results.rows.map(r => r.value));
    }
}