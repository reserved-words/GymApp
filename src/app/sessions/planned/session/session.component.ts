import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { SessionsService } from "src/app/services/sessions.service";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";
import { Icon } from "src/app/shared/enums/icon.enum";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class PlannedSessionComponent {
    Icon = Icon;
    pageTitle: string = "Session";
    session: IPlannedSession;
    errorMessage: string;
    hasExercises: boolean;
    

    constructor(private service: SessionsService, private route: ActivatedRoute, private router: Router){
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getSession<IPlannedSession>(id).then(s => {
            this.session = s;
            this.hasExercises = this.session.exercises.length > 0;
        });
    }

    addExercise(exerciseToAdd: IPlannedExercise):void {
        this.session.exercises.push(exerciseToAdd);
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
    onSave(): void {
        this.service.updateSession(this.session._id, this.session).then(s => {
            this.router.navigate(['']);
        });
    }
}