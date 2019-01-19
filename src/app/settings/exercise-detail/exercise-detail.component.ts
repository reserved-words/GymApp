import { Component, OnInit, Input } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownOption } from "src/app/shared/interfaces/dropdown-option";
import { DropdownHelper } from "src/app/shared/helpers/dropdown.helper";
import { ExercisesService } from "src/app/services/exercises.service";
import { Frequency } from "src/app/shared/enums/frequency.enum";

@Component({
    templateUrl: './exercise-detail.component.html'
})
export class ExerciseDetailComponent implements OnInit {
    pageTitle: string = 'Edit Exercise';
    exercise: IExercise;
    errorMessage: string;
    frequencyOptions: IDropdownOption[];

    constructor(private service: ExercisesService, private route: ActivatedRoute, private router: Router, private dropdowns: DropdownHelper){
        this.frequencyOptions = dropdowns.getFrequencyOptions();
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id != 'new'){
            this.service.subscribe(this.service.getExercise(id), ex => this.exercise = ex);
        }
        else {
            this.exercise = {
                _id: null,
                _rev: null,
                name: '',
                minReps: 0,
                maxReps: 0,
                sets: 0,
                minWeight: 0,
                minIncrement: 0,
                frequency: Frequency.EveryOtherSession,
                addBodyWeight: false
            };
        }
    }
    
    onSave(): void {
        if (this.exercise._id){
            this.service.subscribe(this.service.updateExercise(this.exercise), r => this.router.navigate(['/settings']));
        }
        else {
            this.service.subscribe(this.service.insertExercise(this.exercise), r => this.router.navigate(['/settings']));
        }
    }
}