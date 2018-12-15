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

    constructor(private exerciseService: ExerciseService){
    }

    ngOnInit(): void {
        this.exercise = this.exerciseService.getExercise(this.id);
    }
    
    save(): void {
        alert("Save");
    }
}