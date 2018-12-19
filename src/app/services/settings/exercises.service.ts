import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IExercise } from "../../shared/interfaces/exercise";
import { IQueryResults } from "../../shared/interfaces/queryResults";

@Injectable({
    providedIn: 'root'
})
export class ExercisesService {
    private exercisesUrl = 'http://127.0.0.1:5984/gymapp/_design/exerciseDesignDoc/_view/exercises';

    constructor(private http: HttpClient){}

    getExercises(): Observable<IQueryResults<IExercise>> {
        return this.http.get<IQueryResults<IExercise>>(this.exercisesUrl).pipe(
            tap(data => console.log("All: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
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