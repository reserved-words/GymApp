import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionsService } from "src/app/services/sessions/sessions.service";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { SessionsHelper } from "src/app/shared/helpers/sessions.helper";
import { QueryResultsHelper } from "src/app/shared/helpers/queryResults.helper";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CurrentSessionComponent {
    pageTitle: string = "Session";
    errorMessage: string;
    session: ICurrentSession;

    constructor(private service: SessionsService, private helper: SessionsHelper, private queryResultsHelper: QueryResultsHelper, private route: ActivatedRoute, private router: Router){        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.getSession<ICurrentSession>(id).subscribe(
                s => this.session = s,
                error => this.handleError(error)
            );
        }
        else {
            this.service.getNextSession().subscribe(
                s => this.session = this.helper.createCurrentSession(s.rows[0].value),
                error => this.handleError(error)
            );
        }

        // For each exercises would be better to fetch the minIncrement / session planning details again in case have changed
    }
    
    addExercise():void {
        this.session.exercises.push({ type : "?", warmup: [], sets: [], minIncrement: 2.5, done: false, nextSession: null, nextSessionConfirmed: false });
    }

    markComplete(): void {
        // Add a check to confirm completion

        for (var i in this.session.exercises){
            if (!this.session.exercises[i].done || !this.session.exercises[i].nextSessionConfirmed){
                alert("Mark all exercises as done and confirm next session plans first");
                return;
            }
        }

        this.service.updateSession<ICurrentSession>(this.session._id, this.session).subscribe(
            s => {
                this.session._rev = s.rev;
                this.completeAndPlanNextSessions();
            },
            error => this.handleError(error)
        );
    }
    onBack(): void {
        alert("Add a check to confirm losing changes");
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        this.service.updateSession<ICurrentSession>(this.session._id, this.session).subscribe(
            s => this.session._rev = s.rev,
            error => this.handleError(error)
        );
    }
    handleError(error: any){
        this.errorMessage = <any>error;
        alert(this.errorMessage);
    }

    completeAndPlanNextSessions() {
        this.service.getPlannedSessions().subscribe(
            results => {
                var plannedSessions = this.queryResultsHelper.getValues(results);
                for (var i in this.session.exercises){
                    // Find the next planned session where this exercise will be done
                    // For now just do the next but one session
                    var nextSessionIndex = 2;
                    // If doesn't exist, create it 
                    var index = plannedSessions.length > 0 ? plannedSessions[plannedSessions.length-1].index : 0;
                    while (plannedSessions.length < nextSessionIndex){
                        index++;
                        plannedSessions.push({ _id: null, _rev: null, type: "planned-session", index: index, exercises: [] });
                    }
                    var nextSession = plannedSessions[nextSessionIndex-1];
                    // Ideally should check first that it hasn't already been added - if so, replace it
                    nextSession.exercises.push(this.session.exercises[i].nextSession);
                }
                // Save changes to planned sessions
                // Need to know when ALL finished so can return to home page
                for (var i in plannedSessions){
                    this.savePlannedSession(plannedSessions[i]);
                }
                this.saveCompletedSession();
            },
            error => this.handleError(error)
        );
    }
    savePlannedSession(session: IPlannedSession): void {
        console.log("Saving planned session " + session.index);
        if (session._id){
            this.service.updateSession(session._id, session).subscribe(
                s => {
                    console.log("Updated planned session " + session.index);
                },
                error => this.handleError(error)
            );
        }
        else {
            this.service.insertSession(session).subscribe(
                s => {
                    console.log("Inserted planned session " + session.index);
                },
                error => this.handleError(error)
            );
        }
    }
    saveCompletedSession():void {
        console.log("saving completed session");
        var completedSession = this.helper.completeCurrentSession(this.session);
        this.service.updateSession<ICompletedSession>(this.session._id, completedSession).subscribe(
            s => { console.log("saved completed session"); }, // this.router.navigate(['/sessions']) - only when all saved
            error => this.handleError(error)
        );
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
}