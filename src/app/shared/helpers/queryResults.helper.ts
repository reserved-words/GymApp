import { Injectable } from "@angular/core";
import {IQueryResults } from "../interfaces/queryResults";

@Injectable({
    providedIn: 'root'
})
export class QueryResultsHelper {

    getValues<T>(results: IQueryResults<T>): T[]{
        var list = [];
        for (var index in results.rows){
            list.push(results.rows[index].value);
        }
        return list;
    }

}