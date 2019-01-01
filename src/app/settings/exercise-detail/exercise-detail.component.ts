import { Component, OnInit, Input } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownOption } from "src/app/shared/interfaces/dropdown-option";
import { DropdownHelper } from "src/app/shared/helpers/dropdown.helper";
import { ExercisesService } from "src/app/services/exercises.service";
import { Observable } from "rxjs";

@Component({
    templateUrl: './exercise-detail.component.html',
    styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
    pageTitle: string = 'Edit Exercise';
    exercise: IExercise;
    errorMessage: string;
    frequencyOptions: IDropdownOption[]

    constructor(private service: ExercisesService, private route: ActivatedRoute, private router: Router, private dropdowns: DropdownHelper){
        this.frequencyOptions = dropdowns.getFrequencyOptions();
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.subscribe(this.service.getExercise(id), ex => this.exercise = ex);
    }
    
    onSave(): void {
        this.subscribe(this.service.updateExercise(this.exercise), r => this.router.navigate(['/settings']));
    }

    subscribe<T>(obs: Observable<T>, onSuccess: Function): void {
        obs.subscribe(
            response => onSuccess(response),
            error => this.errorMessage = <any>error
        );
    }
}