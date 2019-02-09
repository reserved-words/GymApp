import { Injectable } from "@angular/core";
import { ICurrentSession } from "../interfaces/current-session";
import { IPlannedSession } from "../interfaces/planned-session";
import { ICompletedExercise } from "../interfaces/completed-exercise";
import { IExercise } from "../interfaces/exercise";
import { SessionsService } from "src/app/services/sessions.service";
import { SessionHelper } from "./session.helper";

@Injectable({
    providedIn: 'root'
})
export class SessionPlanner {

    constructor(private service: SessionsService, private helper: SessionHelper){}

    addToPlannedSession(session: IPlannedSession, planned: IPlannedSession[], current: ICurrentSession, def: IExercise): Promise<void> {
        
        if (current != null){
            alert("You cannot add an exercise to a planned session before the current session is completed");
            return Promise.resolve();
        }
        
        var existingInstance = this.getExistingPlannedInstance(planned, def.name);

        if (existingInstance != null){
            if (existingInstance.session._id === session._id){
                alert("This exercise has already been added to this session");
                return Promise.resolve();
            }
            alert("This will be moved from another planned session.");
            session.exercises.push(existingInstance.exercise);
            planned[existingInstance.sessionIndex].exercises.splice(existingInstance.exerciseIndex, 1);
            return Promise.resolve();
        }

        return this.getLastInstance(def.name)
            .then(lastInstance => {
                session.exercises.push(this.helper.convertCompletedToPlannedExercise(lastInstance, def));
            });
    }

    addToCurrentSession(current: ICurrentSession, planned: IPlannedSession[], def: IExercise): Promise<void> {
        console.log(JSON.stringify(current));
        if (current.exercises.filter(e => e.type === def.name).length > 0){
            alert("This exercise has already been added to this session");
            return Promise.resolve();
        }

        var existingInstance = this.getExistingPlannedInstance(planned, def.name);

        if (existingInstance != null){
            alert("This will be moved from another planned session.");
            current.exercises.push(this.helper.convertPlannedToCurrentExercise(existingInstance.exercise));
            planned[existingInstance.sessionIndex].exercises.splice(existingInstance.exerciseIndex, 1);
            return Promise.resolve();
        }

        return this.getLastInstance(def.name)
            .then(lastInstance => {
                current.exercises.push(this.helper.convertCompletedToCurrentExercise(lastInstance, def));
            });
    }

    private getExistingPlannedInstance(planned: IPlannedSession[], name: string): any {
        for (var i in planned){
            var a = planned[i];
            for (var j in a.exercises){
                var b = a.exercises[j];
                if (b.type === name){
                    return {
                        session: a,
                        sessionIndex: i,
                        exercise: b,
                        exerciseIndex: j
                    };
                }
            }
        }
        return null;
    }

    private getLastInstance(name: string): Promise<ICompletedExercise>{
        return this.service.getLastInstance(name)
            .then(result => {
                return result.total_rows > 0
                    ? result.rows.map(r => r.value)[0]
                    : null;
            });
    }
}