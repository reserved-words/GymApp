import { Component, OnInit, Input } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownOption } from "src/app/shared/interfaces/dropdown-option";
import { DropdownHelper } from "src/app/shared/helpers/dropdown.helper";
import { ExercisesService } from "src/app/services/exercises.service";

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

        this.service.getExercise(id).subscribe(
            ex => this.exercise = ex,
            error => this.errorMessage = <any>error
        );
    }

    onBack(): void {
        this.router.navigate(['/settings']);
    }
    
    onSave(): void {
        this.service.updateExercise(this.exercise).subscribe(
            response => {
                this.router.navigate(['/settings']);
            },
            error => this.errorMessage = <any>error
        );
        
    }
}