import { Observable, of } from "rxjs";
import { IExercise } from "../shared/interfaces/exercise";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {
    private exercises: IQueryResults<IExercise>;

    constructor(private db: DBService){}

    getExercises(): Observable<IQueryResults<IExercise>> {
        if (this.exercises){
            return of(this.exercises);
        }
        return this.db.getList<IExercise>(this.db.exercisesUrl);
    } 

    getExercise(id: string): Observable<IExercise> {
        return this.db.getSingle<IExercise>(id);
    }

    updateExercise(exercise: IExercise): Observable<ISaveResponse> {
        this.exercises = null;
        return this.db.update(exercise._id, exercise._rev, exercise);
    }
}