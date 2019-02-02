import { DBService } from "./db.service";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { BaseService } from "./base.service";
import { IWeight } from "../shared/interfaces/weight";
import { IExercise } from "../shared/interfaces/exercise";
import { ICurrentSession } from "../shared/interfaces/current-session";

@Injectable({
    providedIn: 'root'
})
export class UpdatesService extends BaseService {

    constructor(private db: DBService, private authService: AuthService){
        super(db, authService);
    }

    runUpdates(): Promise<void> {
        return this.roundExistingWeights()
            .then(r0 => this.addBodyWeightPropertyToExercises())
            .then(r1 => this.correctCompletedBodyWeightExercises())
            .then(r3 => this.addBodyWeightToCompletedSessions())
            .then(r4 => this.addBodyWeightMarkerToPlannedExercises())
            .then(r5 => this.addBodyWeightMarkerToCurrentExercises())
            .catch(err => console.log(JSON.stringify(err)));
    }

    roundExistingWeights(): Promise<void> {
        console.log("Fixing bodyWeight units");
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

    addBodyWeightPropertyToExercises(): Promise<void> {
        console.log("Adding addBodyWeight property to exercises");
        return this.db.getList<IExercise>(this.db.exercises)
            .then(result => {
                for (var row of result.rows){
                    var ex = row.value;
                    if (!ex.addBodyWeight){
                        ex.addBodyWeight = false;
                        this.db.update(ex._id, ex._rev, ex);
                    }
                }
            });
    }

    correctCompletedBodyWeightExercises(): Promise<void> {
        console.log("Correcting bodyWeight exercises completed");
        var bodyWeightExercises: string[] = [];
        return this.db.getList<IExercise>(this.db.exercises)
            .then(result => {
                bodyWeightExercises = result.rows.map(r => r.value).filter(e => e.addBodyWeight === true).map(e => e.name);
                return this.db.getList<any>(this.db.completedSessions)
                    .then(sessions => {
                        for (var s of sessions.rows.map(r => r.value)){
                            for (var ex of s.exercises){
                                ex.addBodyWeight = bodyWeightExercises.indexOf(ex.type) >= 0;
                                if (ex.addBodyWeight){
                                    for (var wu of ex.warmup){
                                        if (wu.weight > 0){
                                            wu.weight = wu.weight - 50;
                                        }
                                    }
                                    for (var set of ex.sets){
                                        if (set.weight > 0){
                                            set.weight = set.weight - 50;
                                        }
                                    }
                                }
                            }
                            this.db.update(s._id, s._rev, s);
                        }
                    })
                });
    }
    
    addBodyWeightMarkerToCurrentExercises(): any {
        console.log("Adding bodyWeight marker to current exercises");
        var bodyWeightExercises: string[] = [];
        return this.db.getList<IExercise>(this.db.exercises)
            .then(result => {
                bodyWeightExercises = result.rows.map(r => r.value).filter(e => e.addBodyWeight === true).map(e => e.name);
                return this.db.getList<ICurrentSession>(this.db.currentSession)
                    .then(sessions => {
                        if (sessions.total_rows === 0)
                            return;
                        var session = sessions[0];
                        for (var ex of session.exercises){
                            ex.addBodyWeight = bodyWeightExercises.indexOf(ex.type) >= 0;
                            if (ex.addBodyWeight){
                                for (var wu of ex.warmup){
                                    if (wu.weight > 0){
                                        wu.weight = wu.weight - 50;
                                    }
                                }
                                for (var set of ex.sets){
                                    if (set.weight > 0){
                                        set.weight = set.weight - 50;
                                    }
                                }
                            }
                        }
                        this.db.update(session._id, session._rev, session);
                    })
                });
    }

    addBodyWeightMarkerToPlannedExercises(): any {
        console.log("Adding bodyWeight marker to planned exercises");
        var bodyWeightExercises: string[] = [];
        return this.db.getList<IExercise>(this.db.exercises)
            .then(result => {
                bodyWeightExercises = result.rows.map(r => r.value).filter(e => e.addBodyWeight === true).map(e => e.name);
                return this.db.getList<any>(this.db.plannedSessions)
                    .then(sessions => {
                        for (var s of sessions.rows.map(r => r.value)){
                            for (var ex of s.exercises){
                                ex.addBodyWeight = bodyWeightExercises.indexOf(ex.type) >= 0;
                                if (ex.addBodyWeight){
                                    for (var wu of ex.warmup){
                                        if (wu.weight > 0){
                                            wu.weight = wu.weight - 50;
                                        }
                                    }
                                    for (var set of ex.sets){
                                        if (set.weight > 0){
                                            set.weight = set.weight - 50;
                                        }
                                    }
                                }
                            }
                            this.db.update(s._id, s._rev, s);
                        }
                    })
                });
    }

    addBodyWeightToCompletedSessions(): Promise<void> {
        console.log("Adding bodyWeight to completed sessions");
        var weights: IWeight[] = [];
        return this.db.getList<IWeight>(this.db.weight)
            .then(wghts => {
                weights = wghts.rows.map(r => r.value);
                return this.db.getList<any>(this.db.completedSessions)
                    .then(sessions => {
                        for (var s of sessions.rows.map(r => r.value)){
                            s.bodyWeight = weights[0].kg;
                            for (var w of weights){
                                if (w.date > s.started){
                                    continue;
                                }
                                s.bodyWeight = w.kg;
                            }
                            this.db.update(s._id, s._rev, s);
                        }
                    })
                });
    }
}