import { Component } from "@angular/core";

@Component({
    selector: 'gym-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
    pageTitle: string = 'Edit Exercise';
    id: number = 1;
    name: string = 'Bench press';
    minReps: number = 4;
    maxReps: number = 6;
    numSets: number = 5;
    save(): void {
        alert("Save");
    }
}