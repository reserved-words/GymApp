import { Component, OnInit, Input } from "@angular/core";
import { IExercise } from "../shared/interfaces/exercise";
import { ExerciseService } from "./exercise.service";

@Component({
    selector: 'gym-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
    @Input() id: number;
    pageTitle: string = 'Edit Exercise';
    exercise: IExercise;
    errorMessage: string;

    constructor(private exerciseService: ExerciseService){
    }

    ngOnInit(): void {
        this.exerciseService.getExercise(this.id).subscribe(
            ex => this.exercise = ex,
            error => this.errorMessage = <any>error
        );
    }
    
    save(): void {
        alert("Save");
    }
}