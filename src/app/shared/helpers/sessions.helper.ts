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

    addSet(sets: ISet[], minIncrement: number): void {
        if (sets.length){
            var lastSet = sets[sets.length-1];
            sets.push({ 
                reps: lastSet.reps, 
                weight: lastSet.weight + minIncrement, 
                quantity: 1 
            });
        }
        else {
            sets.push({ reps: 1, weight: minIncrement, quantity: 1 });
        }
    }

    addCurrentSet(sets: ICurrentSet[], minIncrement: number): void {
        if (sets.length){
            var lastSet = sets[sets.length-1];
            sets.push({ 
                reps: lastSet.reps, 
                weight: lastSet.weight + minIncrement, 
                done: false 
            });
        }
        else {
            sets.push({ reps: 1, weight: minIncrement, done: false });
        }
    }

    removeSet<T>(sets: T[], minRequired: number){
        if (sets.length > minRequired){
            sets.pop();
        }
    }

    getNextSession(current: ICurrentExercise): IPlannedExercise {
        return {
            type: current.type,
            minIncrement: current.minIncrement,
            warmup: this.convertCurrentToPlannedWarmup(current.warmup),
            sets: this.convertCurrentToPlannedSets(current.sets)
        }
    }

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

    convertPlannedToCurrentExercises(plannedExercises: IPlannedExercise[]): ICurrentExercise[] {
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

    convertCurrentToCompletedExercises(currentExercises: ICurrentExercise[]): ICompletedExercise[] {
        var completedExercises = [];
        for (var i in currentExercises){
            var currentExercise = currentExercises[i];
            completedExercises.push(this.convertCurrentToCompletedExercise(currentExercise));
        }
        return completedExercises;
    }

    convertCurrentToCompletedExercise(currentExercise: ICurrentExercise): ICompletedExercise {
        return {
            type: currentExercise.type, 
            warmup: this.convertCurrentToCompletedSets(currentExercise.warmup), 
            sets: this.convertCurrentToCompletedSets(currentExercise.sets)
        };
    }

    convertPlannedToCurrentSets(plannedSets: ISet[]): ICurrentSet[]{
        var currentSets = [];
        for (var i in plannedSets){
            var plannedSet = plannedSets[i];
            for (var j = 0; j < plannedSet.quantity; j++){
                currentSets.push({ reps: plannedSet.reps, weight: plannedSet.weight, done: false });
            }
        }
        return currentSets;
    }

    convertCurrentToCompletedSets(currentSets: ICurrentSet[]): ISet[] {
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

    convertCurrentToPlannedWarmup(currentSets: ICurrentSet[]): ISet[] {
        var plannedSets = [];
        for (let currentSet of currentSets){
            var found = false;
            for (var k in plannedSets){
                var completedSet = plannedSets[k];
                if (completedSet.weight === currentSet.weight && completedSet.reps === currentSet.reps){
                    found = true;
                    completedSet.quantity++;
                    break;
                }
            }
            if (!found){
                plannedSets.push({ weight: currentSet.weight, reps: currentSet.reps, quantity: 1 });
            }
        }
        return plannedSets;
    }

    convertCurrentToPlannedSets(currentSets: ICurrentSet[]): ISet[] {
        // Only one set should be returned, and should be dependent on exercise definition, but for now just use completed session data - use best set

        var quantity = currentSets.length;
        var weight = 0;
        var reps = 0;

        for (let currentSet of currentSets){
            if (currentSet.weight > weight){
                weight = currentSet.weight;
                reps = currentSet.reps;
            }
            else if (currentSet.weight === weight && currentSet.reps > reps){
                reps = currentSet.reps;
            }
        }
        return [{ quantity: quantity, weight: weight, reps: reps }];
    }
}