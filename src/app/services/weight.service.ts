import { Observable, of } from "rxjs";
import { IQueryResults } from "../shared/interfaces/queryResults";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { IWeight } from "../shared/interfaces/weight";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class WeightService extends BaseService {
    constructor(private db: DBService, private authService: AuthService){
        super(authService);
    }

    getWeights(): Observable<IQueryResults<IWeight>> {
        return this.db.getList<IWeight>(this.db.weightUrl, null, true);
    }

    insertWeight(weight: IWeight): Observable<ISaveResponse> {
        return this.db.insert({ type: "weight", date: weight.date, stones: weight.stones, pounds: weight.pounds });
    }
}