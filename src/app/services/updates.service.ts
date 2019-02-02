import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { IWeight } from "../shared/interfaces/weight";
import { IExercise } from "../shared/interfaces/exercise";

@Injectable({
    providedIn: 'root'
})
export class UpdatesService extends BaseService {

    constructor(private db: DBService, private authService: AuthService){
        super(db, authService);
    }

    runUpdates(): Promise<void> {
        return this.roundExistingWeights()
             .then(r1 => this.correctBodyweightExercises())
             .then(r2 => this.addBodyweightToCompletedSessions())
             .catch(err => console.log(JSON.stringify(err)));
    }

    roundExistingWeights(): Promise<void> {
        console.log("Fixing bodyweight units");
        var minIncrement = 0.25;
        return this.db.getList<any>(this.db.weight)
            .then(weights => {
                for (var w of weights.rows.map(r => r.value)){
                    if (!w.kg){
                        w.kg = (14*w.stones + w.pounds)*0.453592;
                    }
                    w.kg = Math.round(w.kg / minIncrement)*minIncrement;
                    this.db.update(w._id, w._rev, w);
                }
            });
    }

    correctBodyweightExercises(): Promise<void> {
        console.log("Correcting bodyweight exercises completed");
        var exercises: string[] = [];
        return this.db.getList<IExercise>(this.db.exercises)
            .then(ex => {
                exercises = ex.rows.map(r => r.value).filter(e => e.addBodyWeight === true).map(e => e.name);
                return this.db.getList<any>(this.db.completedSessions)
                    .then(sessions => {
                        for (var s of sessions.rows.map(r => r.value)){
                            var exercisesToCorrect = s.exercises.filter(e => exercises.indexOf(e.type) >= 0);
                            
                            if (exercisesToCorrect.length === 0)
                                continue;

                            for (var ex of exercisesToCorrect){
                                for (var wu of ex.warmup){
                                    wu.weight = wu.weight - 50;
                                }
                                for (var set of ex.sets){
                                    set.weight = set.weight - 50;
                                }
                            }

                            this.db.update(s._id, s._rev, s);
                        }
                    })
                });
    }

    addBodyweightToCompletedSessions(): Promise<void> {
        console.log("Adding bodyweight to completed sessions");
        var weights: IWeight[] = [];
        return this.db.getList<IWeight>(this.db.weight)
            .then(wghts => {
                weights = wghts.rows.map(r => r.value);
                return this.db.getList<any>(this.db.completedSessions)
                    .then(sessions => {
                        for (var s of sessions.rows.map(r => r.value)){
                            s.bodyweight = weights[0].kg;
                            for (var w of weights){
                                if (w.date > s.started){
                                    continue;
                                }
                                s.bodyweight = w.kg;
                            }
                            this.db.update(s._id, s._rev, s);
                        }
                    })
                });
    }
}