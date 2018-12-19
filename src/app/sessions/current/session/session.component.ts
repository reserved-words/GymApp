import { Component, Input } from "@angular/core";
import { CurrentSessionService } from "../../../services/sessions/current-session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CurrentSessionComponent {
    pageTitle: string = "Session";
    exercises: ICurrentExercise[] = [];
    errorMessage: string;
    hasExercises: boolean;
    timeStarted: Date;
    timeCompleted: Date;

    constructor(private service: CurrentSessionService, private route: ActivatedRoute, private router: Router){        
    }

    ngOnInit(){
        this.service.getNextSession().subscribe(
            s => {
                this.createExercises(s.rows[0].value);
                this.timeStarted = new Date();    
            },
            error => this.errorMessage = <any>error
        );
    }

    createExercises(planned: IPlannedSession): void {
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
            this.exercises.push(newEx);
        }
        this.hasExercises = this.exercises.length > 0;
    }
    addExercise():void {
        this.exercises.push({ "type" : "?", "warmup": [], "sets": [], "minIncrement": 2.5, "done": false });
        this.hasExercises = true;
    }
    markComplete(): void {
        this.timeCompleted = new Date();
        alert("Add a check to confirm completion");
        // Save as completed session
        this.router.navigate(['/sessions']);
    }
    onBack(): void {
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        // Save
        this.router.navigate(['/sessions']);
    }
}