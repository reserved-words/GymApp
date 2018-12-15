import { Injectable } from "@angular/core";
import { IExercise } from "../shared/interfaces/exercise";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    getExercise(id: number): IExercise {
        return {
            id: 1,
            icon: 'dumbbell',
            name: 'Bench press',
            minReps: 4,
            maxReps: 6,
            numSets: 5,
            minIncrement: 2.5
        };
    }
}