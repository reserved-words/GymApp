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

    private canAddToPlannedSession(session: IPlannedSession, planned: IPlannedSession[], current: ICurrentSession, def: IExercise): boolean {
        
        if (current != null){
            alert("You cannot amend a planned session before the current session is completed");
            return false;
        }
        
        var existingInstance = this.getExistingPlannedInstance(planned, def.name);

        if (existingInstance != null){
            if (existingInstance.session._id === session._id){
                alert("This exercise has already been added to this session");
                return false;
            }
        }

        return true;
    }

    addToPlannedSession(session: IPlannedSession, planned: IPlannedSession[], current: ICurrentSession, def: IExercise): Promise<void> {
        
        if (!this.canAddToPlannedSession(session, planned, current, def))
            return Promise.resolve();

        var existingInstance = this.getExistingPlannedInstance(planned, def.name);

        if (existingInstance != null){
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

    private canAddToCurrentSession(current: ICurrentSession, planned: IPlannedSession[], def: IExercise): boolean {
        if (current.exercises.filter(e => e.type === def.name).length > 0){
            return false;
        }
        return true;
    }

    addToCurrentSession(current: ICurrentSession, planned: IPlannedSession[], def: IExercise): Promise<void> {
        
        if (!this.canAddToCurrentSession(current, planned, def))
            return Promise.resolve();

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

    private canRemoveFromPlannedSession(session: IPlannedSession, planned: IPlannedSession[], current: ICurrentSession, exerciseType: string): boolean {
        if (current != null){
            alert("You cannot amend a planned session before the current session is completed");
            return false;
        }
        return true;
    }

    removeFromPlannedSession(session: IPlannedSession, planned: IPlannedSession[], current: ICurrentSession, exerciseType: string): void {
        // TO DO: Ask which session (if any) want to move to
        // FOR NOW: Just move to the next planned session if one exists

        if (!this.canRemoveFromPlannedSession(session, planned, current, exerciseType))
            return;

        var indexToRemove = session.exercises.findIndex(ex => ex.type === exerciseType);
        var removedExercise = session.exercises.splice(indexToRemove, 1)[0];
        var sessionIndex = planned.indexOf(session);
        if (sessionIndex === 2){
            alert("No later planned sessions exist so completely removed");
        }
        else {
            planned[sessionIndex + 1].exercises.push(removedExercise);
            alert("Moved to the next planned session");
        }
    }

    private canRemoveFromCurrentSession(current: ICurrentSession, planned: IPlannedSession[], exerciseType: string): boolean {
        return true;
    }

    removeFromCurrentSession(current: ICurrentSession, planned: IPlannedSession[], exerciseType: string): void {
        // TO DO: Ask which session (if any) want to move to
        // FOR NOW: Just move to the next planned session

        if (!this.canRemoveFromCurrentSession(current, planned, exerciseType))
            return;

        var indexToRemove = current.exercises.findIndex(ex => ex.type === exerciseType);
        var removedExercise = current.exercises.splice(indexToRemove, 1)[0];
        planned[0].exercises.push(this.helper.convertCurrentToPlannedExercise(removedExercise));
        alert("Moved to the next planned session");
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