import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IExercise } from "../../shared/interfaces/exercise";
import { IQueryResults } from "../../shared/interfaces/queryResults";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {
    private documentUrl: string = 'http://127.0.0.1:5984/gymapp/';
    private exercisesUrl = 'http://127.0.0.1:5984/gymapp/_design/exerciseDesignDoc/_view/exercises';

    private exercises: IQueryResults<IExercise>;

    constructor(private http: HttpClient){}

    getExercises(): Observable<IQueryResults<IExercise>> {
        if (this.exercises){
            return of(this.exercises);
        }
        return this.http.get<IQueryResults<IExercise>>(this.exercisesUrl).pipe(
            tap(data => this.exercises = data),
            tap(data => console.log("All: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
    } 

    getExercise(id: string): Observable<IExercise> {
        return this.http.get<IExercise>(this.documentUrl + id).pipe(
            tap(data => console.log("All: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    updateExercise(exercise: IExercise): Observable<ISaveResponse> {
        this.exercises = null;
        return this.http
            .put<ISaveResponse>(this.documentUrl + exercise._id + "?rev=" + exercise._rev, JSON.stringify(exercise))
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            // A client-side or network error occurred
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            // The back end returned an unsuccessful response code
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);    
    }
}