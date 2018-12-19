import { Injectable } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ExerciseDetailService {
    private exerciseUrl = 'http://127.0.0.1:5984/gymapp/';

    constructor(private http: HttpClient){}

    getExercise(id: string): Observable<IExercise> {
        return this.http.get<IExercise>(this.exerciseUrl + id).pipe(
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