import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { SessionsService } from "src/app/services/sessions.service";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";
import { Icon } from "src/app/shared/enums/icon.enum";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class PlannedSessionComponent {
    Icon = Icon;
    pageTitle: string = "Session";
    session: IPlannedSession;
    currentSession: ICurrentSession;
    plannedSessions: IPlannedSession[];
    errorMessage: string;
    loading: boolean = true;
    
    constructor(private service: SessionsService, private route: ActivatedRoute, private router: Router){
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getPlannedSessions(3)
            .then(result1 => {
                this.plannedSessions = result1.rows.map(r => r.value);
                this.session = this.plannedSessions.filter(s => s._id === id)[0];
            })
            .then(result2 => this.service.getCurrentSession())
            .then(s => {
                this.currentSession = s.total_rows > 0 ? s.rows.map(r => r.value)[0] : null;
                this.loading = false;
            })
            .catch(err => {
                this.loading = false;
                alert(err.message);
            });
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
        this.loading = true;
        this.service.updateSessions(this.currentSession, this.plannedSessions)
            .then(values => {
                console.log(JSON.stringify(values));
                this.loading = false;
                alert("Changes saved");
            })
            .catch(err => {
                this.loading = false;
                alert(err.message);
            });
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.session.exercises, event.previousIndex, event.currentIndex);
    }
}