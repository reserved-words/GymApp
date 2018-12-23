import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { SessionsService } from "src/app/services/sessions.service";
import { Observable } from "rxjs";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class PlannedSessionComponent {
    pageTitle: string = "Session";
    session: IPlannedSession;
    errorMessage: string;
    hasExercises: boolean;

    constructor(private service: SessionsService, private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.subscribe(this.service.getSession<IPlannedSession>(id), s => {
            this.session = s;
            this.hasExercises = this.session.exercises.length > 0;
        });
    }

    addExercise():void {
        // Show popup with exercise type dropdown
        // If exercise type already added, prevent
        var ex = { type: "?", warmup: [], sets: [], minIncrement: 2.5 };
        ex.sets.push({ quantity: 5, reps: 5, weight: 10 });
        this.session.exercises.push(ex);
        this.hasExercises = true;
    }
    removeExercise(exerciseType: string):void {
        var updatedList = [];
        for (var i in this.session.exercises){
            var ex = this.session.exercises[i];
            if (ex.type != exerciseType){
                updatedList.push(ex);
            }
        }
        this.session.exercises = updatedList;
    }
    onBack(): void {
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        this.subscribe(this.service.updateSession(this.session._id, this.session), s => {
            this.router.navigate(['/sessions']);
        });
    }

    subscribe<T>(obs: Observable<T>, onSuccess: Function = null): void {
        obs.subscribe(
            response => { if (onSuccess){ onSuccess(response); }},
            error => this.errorMessage = <any>error
        );
    }
}