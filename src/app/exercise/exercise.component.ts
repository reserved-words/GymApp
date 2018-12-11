import { Component, OnInit } from "@angular/core";
import { IExercise } from "../interfaces/exercise";

@Component({
    selector: 'gym-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
    pageTitle: string = 'Edit Exercise';
    exercise: IExercise;

    constructor(){
        this.exercise = {
            id: 1,
            icon: 'dumbbell',
            name: 'Bench press',
            minReps: 4,
            maxReps: 6,
            numSets: 5
        };
    }

    ngOnInit(): void {
        console.log('In OnInit');
    }
    
    save(): void {
        alert("Save");
    }
}