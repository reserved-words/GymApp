import { Injectable } from "@angular/core";
import { IExercise } from "../shared/interfaces/exercise";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {
    getExercises(): IExercise[] {
        return [
            { id:1, name: "Bench press", icon: "dumbbell", minReps:4, maxReps: 6, numSets: 5, minIncrement: 2.5 },
            { id:2, name: "Chin-up", icon: "dumbbell", minReps:4, maxReps: 10, numSets: 4, minIncrement: 2.5 },
            { id:3, name: "Deadlift", icon: "dumbbell", minReps:5, maxReps: 5, numSets: 5, minIncrement: 2.5 },
            { id:4, name: "Dip", icon: "dumbbell", minReps:4, maxReps: 10, numSets: 4, minIncrement: 2.5 },
            { id:5, name: "Pull-up", icon: "dumbbell", minReps:4, maxReps: 10, numSets: 4, minIncrement: 2.5 },
            { id:6, name: "Shoulder press", icon: "dumbbell", minReps:4, maxReps: 6, numSets: 5, minIncrement: 2.5 },
            { id:7, name: "Squat", icon: "dumbbell", minReps:5, maxReps: 5, numSets: 5, minIncrement: 2.5 },
            { id:8, name: "Tricep extension", icon: "dumbbell", minReps:8, maxReps: 12, numSets: 4, minIncrement: 3.75 }
        ];
    } 
}