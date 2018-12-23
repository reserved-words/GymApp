import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DBService {
    baseUrl: string = 'http://127.0.0.1:5984/gymapp/';

    exercisesUrl: string = this.baseUrl + '_design/exerciseDesignDoc/_view/exercises';
    nextSessionUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/plannedSessions?limit=1';
    completedSessionsUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/completedSessions?descending=true&limit=3';
    plannedSessionsUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/plannedSessions?limit=3';
    currentSessionUrl: string = this.baseUrl + '_design/sessionDesignDoc/_view/currentSession';
    
    getDocumentUrl(id: string, rev: string = null){
        return this.baseUrl + id + (rev ? ("?rev=" + rev) : "");
    }

    handleError(err: HttpErrorResponse){
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