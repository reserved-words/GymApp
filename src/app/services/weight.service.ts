import { Observable, of } from "rxjs";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { IWeight } from "../shared/interfaces/weight";

@Injectable({
    providedIn: 'root'
})
export class WeightService {
    private weights: IQueryResults<IWeight>;

    constructor(private db: DBService){}

    getWeights(): Observable<IQueryResults<IWeight>> {
        if (this.weights){
            return of(this.weights);
        }
        return this.db.getList<IWeight>(this.db.weightUrl, null, true);
    }

    insertWeight(weight: IWeight): Observable<ISaveResponse> {
        this.weights = null;
        return this.db.insert({ type: "weight", date: weight.date, stones: weight.stones, pounds: weight.pounds });
    }
}