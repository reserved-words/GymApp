import { Component } from "@angular/core";
import { IExercise } from "../interfaces/exercise";

@Component({
    selector: 'gym-exercises',
    templateUrl: 'exercises.component.html'
})
export class ExercisesComponent {
    pageTitle: string = 'Exercises';
    list: IExercise[] = [
        { id:1, name: "Bench press", icon: "dumbbell", minReps:4, maxReps: 6, numSets: 5 },
        { id:2, name: "Chin-up", icon: "dumbbell", minReps:4, maxReps: 10, numSets: 4 },
        { id:3, name: "Deadlift", icon: "dumbbell", minReps:5, maxReps: 5, numSets: 5 },
        { id:4, name: "Dip", icon: "dumbbell", minReps:4, maxReps: 10, numSets: 4 },
        { id:5, name: "Pull-up", icon: "dumbbell", minReps:4, maxReps: 10, numSets: 4 },
        { id:6, name: "Shoulder press", icon: "dumbbell", minReps:4, maxReps: 6, numSets: 5 },
        { id:7, name: "Squat", icon: "dumbbell", minReps:5, maxReps: 5, numSets: 5 },
        { id:8, name: "Tricep extension", icon: "dumbbell", minReps:8, maxReps: 12, numSets: 4 }
    ];
    edit(): void {
        alert("Edit exercise!");
    }
}