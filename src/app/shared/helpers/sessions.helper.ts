import { Injectable } from "@angular/core";
import { ICurrentSession } from "../interfaces/current-session";
import { IPlannedSession } from "../interfaces/planned-session";
import { ICompletedSession } from "../interfaces/completed-session";
import { ICurrentExercise } from "../interfaces/current-exercise";
import { ICompletedExercise } from "../interfaces/completed-exercise";
import { ICurrentSet } from "../interfaces/current-set";
import { ISet } from "../interfaces/set";
import { IPlannedExercise } from "../interfaces/planned-exercise";


@Injectable({
    providedIn: 'root'
})
export class SessionsHelper {

    createCurrentSession(planned: IPlannedSession): ICurrentSession {
        return {
            _id: planned._id,
            _rev: planned._rev,
            type: "current-session",
            started: new Date(),    
            completed: null,
            exercises: this.convertPlannedToCurrentExercises(planned.exercises)
        };
    }

    completeCurrentSession(session: ICurrentSession): ICompletedSession {
        return {
            _id: session._id,
            _rev: session._rev,
            type: "completed-session",
            started: session.started,
            completed: new Date(),
            exercises: this.convertCurrentToCompletedExercises(session.exercises)
        };
    }

    private convertPlannedToCurrentExercises(plannedExercises: IPlannedExercise[]): ICurrentExercise[] {
        var currentExercises = [];
        for (var i in plannedExercises){
            var plannedExercise = plannedExercises[i];
            currentExercises.push({ 
                type: plannedExercise.type, 
                minIncrement: plannedExercise.minIncrement, 
                warmup: this.convertPlannedToCurrentSets(plannedExercise.warmup), 
                sets: this.convertPlannedToCurrentSets(plannedExercise.sets), 
                done: false 
            });
        }
        return currentExercises;
    }

    private convertCurrentToCompletedExercises(currentExercises: ICurrentExercise[]): ICompletedExercise[] {
        var completedExercises = [];
        for (var i in currentExercises){
            var currentExercise = currentExercises[i];
            completedExercises.push({
                type: currentExercise.type, 
                warmup: this.convertCurrentToCompletedSets(currentExercise.warmup), 
                sets: this.convertCurrentToCompletedSets(currentExercise.sets)
            });
        }
        return completedExercises;
    }

    private convertPlannedToCurrentSets(plannedSets: ISet[]): ICurrentSet[]{
        var currentSets = [];
        for (var i in plannedSets){
            var plannedSet = plannedSets[i];
            for (var j = 0; j < plannedSet.quantity; j++){
                currentSets.push({ reps: plannedSet.reps, weight: plannedSet.weight, done: false });
            }
        }
        return currentSets;
    }

    private convertCurrentToCompletedSets(currentSets: ICurrentSet[]): ISet[] {
        var completedSets = [];
        for (var j in currentSets){
            var currentSet = currentSets[j];
            var found = false;
            for (var k in completedSets){
                var completedSet = completedSets[k];
                if (completedSet.weight === currentSet.weight && completedSet.reps === currentSet.reps){
                    found = true;
                    completedSet.quantity++;
                    break;
                }
            }
            if (!found){
                completedSets.push({ weight: currentSet.weight, reps: currentSet.reps, quantity: 1 });
            }
        }
        return completedSets;
    }
}