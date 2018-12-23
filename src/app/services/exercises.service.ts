import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IExercise } from "../shared/interfaces/exercise";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {
    private exercises: IQueryResults<IExercise>;

    constructor(private db: DBService, private http: HttpClient){}

    getExercises(): Observable<IQueryResults<IExercise>> {
        if (this.exercises){
            return of(this.exercises);
        }
        return this.http.get<IQueryResults<IExercise>>(this.db.exercisesUrl).pipe(
            tap(data => this.exercises = data),
            tap(data => console.log("All: " + JSON.stringify(data))),
            catchError(this.db.handleError)
        );
    } 

    getExercise(id: string): Observable<IExercise> {
        return this.http.get<IExercise>(this.db.getDocumentUrl(id)).pipe(
            tap(data => console.log("All: " + JSON.stringify(data))),
            catchError(this.db.handleError)
        );
    }

    updateExercise(exercise: IExercise): Observable<ISaveResponse> {
        this.exercises = null;
        return this.http
            .put<ISaveResponse>(this.db.getDocumentUrl(exercise._id, exercise._rev), JSON.stringify(exercise))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.db.handleError));
    }
}