import { Injectable } from "@angular/core";
import { ICurrentSession } from "../interfaces/current-session";
import { ICompletedSession } from "../interfaces/completed-session";
import { ICurrentExercise } from "../interfaces/current-exercise";
import { ICompletedExercise } from "../interfaces/completed-exercise";
import { ICurrentSet } from "../interfaces/current-set";
import { ISet } from "../interfaces/set";
import { WeightService } from "src/app/services/weight.service";

@Injectable({
    providedIn: 'root'
})
export class SessionCompleter {

    constructor(private weightService: WeightService){}

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
}