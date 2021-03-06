import { Injectable } from "@angular/core";
import { ICurrentSession } from "../interfaces/current-session";
import { IPlannedSession } from "../interfaces/planned-session";
import { ICompletedSession } from "../interfaces/completed-session";
import { ICurrentExercise } from "../interfaces/current-exercise";
import { ICompletedExercise } from "../interfaces/completed-exercise";
import { ICurrentSet } from "../interfaces/current-set";
import { ISet } from "../interfaces/set";
import { IPlannedExercise } from "../interfaces/planned-exercise";
import { IExercise } from "../interfaces/exercise";
import { ExercisesService } from "src/app/services/exercises.service";
import { WeightService } from "src/app/services/weight.service";

@Injectable({
    providedIn: 'root'
})
export class SessionHelper {
    constructor(private service: ExercisesService, private weightService: WeightService){}

    addSet(sets: ISet[], exercise: string): void {
        this.service.getExercises().then(
            response => {
                var def = response.rows.map(r => r.value).filter(r => r.name === exercise)[0];
                if (sets.length){
                    var lastSet = sets[sets.length-1];
                    sets.push({ 
                        reps: lastSet.reps, 
                        weight: lastSet.weight + def.minIncrement, 
                        quantity: 1 
                    });
                }
                else {
                    sets.push({ reps: def.minReps, weight: def.minIncrement, quantity: 1 });
                }
            }
        );
    }

    addCurrentSet(sets: ICurrentSet[], exercise: string): void {
        this.service.getExercises().then(
            response => {
                var def = response.rows.map(r => r.value).filter(r => r.name === exercise)[0];
                if (sets.length){
                    var lastSet = sets[sets.length-1];
                    sets.push({ 
                        reps: lastSet.reps, 
                        weight: lastSet.weight + def.minIncrement, 
                        done: false 
                    });
                }
                else {
                    sets.push({ reps: def.minReps, weight: def.minWeight, done: false });
                }        
            }
        );
    }

    removeSet<T>(sets: T[], minRequired: number){
        if (sets.length > minRequired){
            sets.pop();
        }
    }

    getNextSession(current: ICurrentExercise): IPlannedExercise {
        return {
            type: current.type,
            addBodyWeight: current.addBodyWeight,
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

    completeCurrentSession(session: ICurrentSession): Promise<ICompletedSession> {
        return this.weightService.getCurrent()
            .then(c => {
                return {
                    _id: session._id,
                    _rev: session._rev,
                    type: "completed-session",
                    started: session.started,
                    completed: new Date(),
                    bodyWeight: c.kg,
                    exercises: this.convertCurrentToCompletedExercises(session.exercises)
                };
            });
    }

    convertPlannedToCurrentExercises(plannedExercises: IPlannedExercise[]): ICurrentExercise[] {
        var currentExercises = [];
        for (var i in plannedExercises){
            var plannedExercise = plannedExercises[i];
            currentExercises.push({ 
                type: plannedExercise.type, 
                addBodyWeight: plannedExercise.addBodyWeight,
                warmup: this.convertPlannedToCurrentSets(plannedExercise.warmup), 
                sets: this.convertPlannedToCurrentSets(plannedExercise.sets), 
                done: false 
            });
        }
        return currentExercises;
    }

    convertPlannedToCurrentExercise(plannedExercise: IPlannedExercise): ICurrentExercise {
        return { 
            type: plannedExercise.type, 
            addBodyWeight: plannedExercise.addBodyWeight,
            warmup: this.convertPlannedToCurrentSets(plannedExercise.warmup), 
            sets: this.convertPlannedToCurrentSets(plannedExercise.sets), 
            done: false,
            nextSession: null,
            nextSessionConfirmed: false
        };
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
            addBodyWeight: currentExercise.addBodyWeight,
            warmup: this.convertCurrentToCompletedSets(currentExercise.warmup), 
            sets: this.convertCurrentToCompletedSets(currentExercise.sets)
        };
    }

    convertPlannedToCurrentSets(plannedSets: ISet[]): ICurrentSet[]{
        var currentSets = [];
        for (var plannedSet of plannedSets){
            for (var j = 0; j < plannedSet.quantity; j++){
                currentSets.push({ reps: plannedSet.reps, weight: plannedSet.weight, done: false });
            }
        }
        return currentSets;
    }

    convertCurrentToCompletedSets(currentSets: ICurrentSet[]): ISet[] {
        var completedSets = [];
        for (var currentSet of currentSets){
            var found = false;
            for (var completedSet of completedSets){
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

    convertCurrentToPlannedExercise(exercise: ICurrentExercise): IPlannedExercise {
        return { 
            type: exercise.type,
            addBodyWeight: exercise.addBodyWeight,
            warmup: this.convertCurrentToPlannedWarmup(exercise.warmup),
            sets: this.convertCurrentToPlannedSets(exercise.sets)
        };
    }

    convertCurrentToPlannedWarmup(currentSets: ICurrentSet[]): ISet[] {
        var plannedSets = [];
        for (let currentSet of currentSets){
            var found = false;
            for (var plannedSet of plannedSets){
                if (plannedSet.weight === currentSet.weight && plannedSet.reps === currentSet.reps){
                    found = true;
                    plannedSet.quantity++;
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
        var weight: number;
        var reps: number;
        
        for (let currentSet of currentSets){
            if (!weight || currentSet.weight > weight){
                weight = currentSet.weight;
                reps = currentSet.reps;
            }
            else if (currentSet.weight === weight && currentSet.reps > reps){
                reps = currentSet.reps;
            }
        }
        return [{ quantity: currentSets.length, weight: weight, reps: reps }];
    }

    convertCompletedToPlannedExercise(completed: ICompletedExercise, type: IExercise): IPlannedExercise {
        var ex = { 
            type: type.name,
            addBodyWeight: type.addBodyWeight,
            warmup: [],
            sets: [],
            minIncrement: type.minIncrement
        };

        if (completed){
            var weight: number;
            var reps: number;
    
            for (let completedSet of completed.sets){
                if (!weight || completedSet.weight > weight){
                    weight = completedSet.weight;
                    reps = completedSet.reps;
                }
                else if (completedSet.weight === weight && completedSet.reps > reps){
                    reps = completedSet.reps;
                }
            }
            
            ex.warmup = completed.warmup;
            ex.sets = [{ quantity: type.sets, weight: weight, reps: reps }];
        }
        else {
            ex.sets.push({ quantity: type.sets, weight: type.minWeight, reps: type.minReps })
        }
        return ex;
    }

    convertCompletedToCurrentExercise(lastInstance: ICompletedExercise, def: IExercise): ICurrentExercise {
        var ex = { 
            type: def.name,
            addBodyWeight: def.addBodyWeight,
            warmup: [],
            sets: [],
            minIncrement: def.minIncrement,
            done: false,
            nextSession: null,
            nextSessionConfirmed: false
        };

        if (lastInstance == null){
            for (var i = 0; i < def.sets; i++){
                ex.sets.push({ reps: def.minReps, weight: def.minWeight, done: false });
            }
            return ex;
        }

        var weight: number;
        var reps: number;

        for (let completedSet of lastInstance.sets){
            if (!weight || completedSet.weight > weight){
                weight = completedSet.weight;
                reps = completedSet.reps;
            }
            else if (completedSet.weight === weight && completedSet.reps > reps){
                reps = completedSet.reps;
            }
        }
        
        ex.warmup = lastInstance.warmup;
        ex.sets = [{ quantity: lastInstance.sets, weight: weight, reps: reps }];

        return ex;
    }
}