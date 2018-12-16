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
        this.exerciseService.getExercise('8663e791d5fa6934e5c99737be01985e').subscribe(
            ex => this.exercise = ex,
            error => this.errorMessage = <any>error
        );
    }
    
    save(): void {
        alert("Save");
    }
}