import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { SessionsService } from "src/app/services/sessions/sessions.service";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CurrentSessionComponent {
    pageTitle: string = "Session";
    errorMessage: string;
    hasExercises: boolean;
    session: ICurrentSession;

    constructor(private service: SessionsService, private route: ActivatedRoute, private router: Router){        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        if (id){
            this.service.getSession<ICurrentSession>(id).subscribe(
                s => {
                    this.session = s;
                    this.hasExercises = this.session.exercises.length > 0;    
                },
                error => this.errorMessage = <any>error
            );
        }
        else{
            this.service.getNextSession().subscribe(
                s => {
                    this.createSession(s.rows[0].value);
                },
                error => this.errorMessage = <any>error
            );
        }
    }

    createSession(planned: IPlannedSession): void {
        this.session = {
            _id: planned._id,
            _rev: planned._rev,
            type: "current-session",
            started: new Date(),    
            completed: null,
            exercises:[]
        };
        for (var i in planned.exercises){
            var ex = planned.exercises[i];
            var newEx = { type: ex.type, minIncrement: ex.minIncrement, warmup: [], sets: [], done: false };
            for (var j in ex.warmup){
                var w = ex.warmup[j];
                for (var k = 0; k < w.quantity; k++){
                    newEx.warmup.push({ reps: w.reps, weight: w.weight, done: false });
                }
            }
            for (var m in ex.sets){
                var w = ex.sets[m];
                for (var n = 0; n < w.quantity; n++){
                    newEx.sets.push({ reps: w.reps, weight: w.weight, done: false });
                }
            }
            this.session.exercises.push(newEx);
        }
        this.hasExercises = this.session.exercises.length > 0;
    }
    addExercise():void {
        this.session.exercises.push({ "type" : "?", "warmup": [], "sets": [], "minIncrement": 2.5, "done": false });
        this.hasExercises = true;
    }
    markComplete(): void {
        // alert("Add a check to confirm completion");
        var completedSession = {
            _id: this.session._id,
            _rev: this.session._rev,
            type: "completed-session",
            started: this.session.started,
            completed: new Date(),
            exercises: []
        };
        for (var i in this.session.exercises){
            var ex = this.session.exercises[i];
            var newEx = { type: ex.type, warmup: [], sets: [] };
            for (var j in ex.warmup){
                var w = ex.warmup[j];
                var found = false;
                for (var k in newEx.warmup){
                    var set = newEx.warmup[k];
                    if (set.weight === w.weight && set.reps === w.reps){
                        found = true;
                        set.quantity++;
                        break;
                    }
                }
                if (!found){
                    newEx.warmup.push({ weight: w.weight, reps: w.reps, quantity: 1 });
                }
            }
            for (var j in ex.sets){
                var s = ex.sets[j];
                var found = false;
                for (var k in newEx.sets){
                    var set = newEx.sets[k];
                    if (set.weight === w.weight && set.reps === w.reps){
                        found = true;
                        set.quantity++;
                        break;
                    }
                }
                if (!found){
                    newEx.sets.push({ weight: w.weight, reps: w.reps, quantity: 1 });
                }
            }
            completedSession.exercises.push(newEx);
        }
        this.service.saveSession<ICompletedSession>(this.session._id, completedSession).subscribe(
            s => {
                alert("Saved");
                this.router.navigate(['/sessions']);    
            },
            error => this.errorMessage = <any>error
        );
    }
    onBack(): void {
        alert("Add a check to confirm losing changes");
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        this.service.saveSession<ICurrentSession>(this.session._id, this.session).subscribe(
            s => {
                this.session._rev = s.rev;
                alert("Success");
            },
            error => {
                this.errorMessage = <any>error;
                alert(this.errorMessage);
            }
        );
    }
}