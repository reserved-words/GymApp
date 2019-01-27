import { Observable, of } from "rxjs";
import { IExercise } from "../shared/interfaces/exercise";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { IDataValue } from "../shared/interfaces/dataValue";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService extends BaseService {
    private exercises: IQueryResponse<IExercise>;

    constructor(private db: DBService, private authService: AuthService){
        super(db, authService);
    }

    getExercises(): Promise<IQueryResponse<IExercise>> {
        if (this.exercises){
            return new Promise(v => this.exercises);
        }
        return this.db.getList<IExercise>(this.db.exercises);
    } 

    getExercise(id: string): Promise<IExercise> {
        return this.db.getSingle<IExercise>(id);
    }

    insertExercise(exercise: IExercise): Promise<ISaveResponse> {
        this.exercises = null;
        return this.db.insert({
            type: 'exercise',
            name: exercise.name,
            minReps: exercise.minReps,
            maxReps: exercise.maxReps,
            sets: exercise.sets,
            minWeight: exercise.minWeight,
            minIncrement: exercise.minIncrement,
            frequency: exercise.frequency
        });
    }

    updateExercise(exercise: IExercise): Promise<ISaveResponse> {
        this.exercises = null;
        return this.db.update(exercise._id, exercise._rev, exercise);
    }

    getMaxWeight(exercise: string): Promise<IQueryResponse<IDataValue>>{
        if (!exercise){
            return this.db.getList<IDataValue>(this.db.maxWeight);
        }
        else {
            return this.db.getList<IDataValue>(this.db.maxWeight, null, true, [exercise, {}], [exercise]);
        
        }
    }

    getTotalWeight(exercise: string): Promise<IQueryResponse<IDataValue>>{
        if (!exercise){
            return this.db.getList<IDataValue>(this.db.totalWeight);
        }
        else {
            return this.db.getList<IDataValue>(this.db.totalWeight, null, true, [exercise, {}], [exercise]);
        }
    }
}