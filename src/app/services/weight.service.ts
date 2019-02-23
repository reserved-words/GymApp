import { IQueryResponse } from "../shared/interfaces/queryResponse";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { IWeight } from "../shared/interfaces/weight";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { View } from "../shared/enums/view.enum";

@Injectable({
    providedIn: 'root'
})
export class WeightService extends BaseService {
    constructor(private db: DBService, private authService: AuthService){
        super(db, authService);
    }

    getCurrent(): Promise<IWeight> {
        return this.db.getList<IWeight>(View.Weight, 1, true)
            .then(w => {
                return w.rows[0].value;
            });
    }

    getWeights(): Promise<IQueryResponse<IWeight>> {
        return this.db.getList<IWeight>(View.Weight, null, true);
    }

    insertWeight(weight: IWeight): Promise<ISaveResponse> {
        return this.db.insert({ type: "weight", date: weight.date, kg: weight.kg });
    }
}