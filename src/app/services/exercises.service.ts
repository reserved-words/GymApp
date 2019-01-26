import { Observable, of } from "rxjs";
import { IExercise } from "../shared/interfaces/exercise";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { IDataValue } from "../shared/interfaces/dataValue";
import { IDataValueGroup } from "../shared/interfaces/dataValueGroup";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService extends BaseService {
    private exercises: IQueryResults<IExercise>;

    constructor(private db: DBService, private authService: AuthService){
        super(authService);
    }

    getExercises(): Promise<IQueryResults<IExercise>> {
        if (this.exercises){
            return new Promise(v => this.exercises);
        }
        return this.db.getList<IExercise>(this.db.exercisesUrl);
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

    getMaxWeight(exercise: string): Promise<IQueryResults<IDataValue>>{
        if (!exercise){
            return this.db.getList<IDataValue>(this.db.maxWeightUrl);
        }
        else {
            return this.db.getList<IDataValue>(this.db.maxWeightUrl, null, true, [exercise, {}], [exercise]);
        
        }
    }

    getTotalWeight(exercise: string): Promise<IQueryResults<IDataValue>>{
        if (!exercise){
            return this.db.getList<IDataValue>(this.db.totalWeightUrl);
        }
        else {
            return this.db.getList<IDataValue>(this.db.totalWeightUrl, null, true, [exercise, {}], [exercise]);
        }
    }
}