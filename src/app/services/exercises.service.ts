import { IExercise } from "../shared/interfaces/exercise";
import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { IDataValue } from "../shared/interfaces/dataValue";
import { View } from "../shared/enums/view.enum";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService extends BaseService {
    constructor(private db: DBService, private authService: AuthService){
        super(db, authService);
    }

    getExercises(): Promise<IQueryResponse<IExercise>> {
        return this.db.getList<IExercise>(View.Exercises);
    } 

    getExercise(id: string): Promise<IExercise> {
        return this.db.getSingle<IExercise>(id);
    }

    insertExercise(exercise: IExercise): Promise<ISaveResponse> {
        return this.db.insert({
            type: 'exercise',
            name: exercise.name,
            minReps: exercise.minReps,
            maxReps: exercise.maxReps,
            sets: exercise.sets,
            minWeight: exercise.minWeight,
            minIncrement: exercise.minIncrement,
            frequency: exercise.frequency,
            addBodyWeight: exercise.addBodyWeight
        });
    }

    updateExercise(exercise: IExercise): Promise<ISaveResponse> {
        return this.db.update(exercise._id, exercise._rev, exercise);
    }

    getView(view: View, exercise: string): Promise<IQueryResponse<IDataValue>>{
        if (!exercise){
            return this.db.getList<IDataValue>(view);
        }
        else {
            return this.db.getList<IDataValue>(view, null, true, [exercise, {}], [exercise]);
        }
    }
}