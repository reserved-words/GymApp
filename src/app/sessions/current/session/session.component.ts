import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionsService } from "src/app/services/sessions.service";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { SessionsHelper } from "src/app/shared/helpers/sessions.helper";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { ExercisesService } from "src/app/services/exercises.service";
import { Frequency } from "src/app/shared/enums/frequency.enum";
import { IExercise } from "src/app/shared/interfaces/exercise";
import { Observable } from "rxjs";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CurrentSessionComponent {
    pageTitle: string = "Session";
    errorMessage: string;
    session: ICurrentSession;

    private exerciseDefinitions: IExercise[];

    constructor(private service: SessionsService, private helper: SessionsHelper, 
        private route: ActivatedRoute, private router: Router, private exercisesService: ExercisesService){        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.subscribe(this.service.getSession<ICurrentSession>(id), s => {
                this.session = s,
                this.updateExerciseDefinitions();
            });
        }
        else {
            this.subscribe(this.service.getNextSession(), s => {
                this.session = this.helper.createCurrentSession(s.rows[0].value);
                this.updateExerciseDefinitions();
            });
        }
    }

    updateExerciseDefinitions(){
        this.subscribe(this.exercisesService.getExercises(), exercises => {
            this.exerciseDefinitions = exercises.rows.map(r => r.value);
            for (let ex of this.session.exercises){
                var def = this.exerciseDefinitions.filter(v => v.name === ex.type)[0];
                ex.minIncrement = def.minIncrement;
            }
        });
    }

    addExercise(exerciseToAdd: ICurrentExercise):void {
        this.session.exercises.push(exerciseToAdd);
    }
    
    markComplete(): void {
        // Add a check to confirm completion

        for (var i in this.session.exercises){
            if (!this.session.exercises[i].done || !this.session.exercises[i].nextSessionConfirmed){
                alert("Mark all exercises as done and confirm next session plans first");
                return;
            }
        }

        this.subscribe(this.service.updateSession<ICurrentSession>(this.session._id, this.session),
            s => {
                this.session._rev = s.rev;
                this.completeAndPlanNextSessions();
            });
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
        this.subscribe(this.service.getPlannedSessions(),
            results => {
                var plannedSessions = results.rows.map(r => r.value);
                for (let ex of this.session.exercises){
                            
                    var def = this.exerciseDefinitions.filter(r => r.name === ex.type)[0];

                    var nextSessionIndex =
                        (def.frequency == Frequency.EverySession ? 1 :
                        (def.frequency == Frequency.EveryOtherSession ? 2 :
                        (def.frequency == Frequency.EveryThirdSession ? 3 : 1)));

                    if (def.frequency == Frequency.TwoInEveryThreeSessions){
                        var doneInPreviousSession = true; // TO DO check if done in previous session as well
                        nextSessionIndex = doneInPreviousSession ? 2 : 1;
                    }

                    var index = plannedSessions.length > 0 ? plannedSessions[plannedSessions.length-1].index : 0;
                    while (plannedSessions.length < nextSessionIndex){
                        index++;
                        plannedSessions.push({ _id: null, _rev: null, type: "planned-session", index: index, exercises: [] });
                    }

                    var nextSession = plannedSessions[nextSessionIndex-1];
                    nextSession.exercises.push(ex.nextSession);
                }

                // Need to know when ALL save processes finished so can return to home page
                for (var i in plannedSessions){
                    this.savePlannedSession(plannedSessions[i]);
                }
                this.saveCompletedSession();
            }
        );
    }
    savePlannedSession(session: IPlannedSession): void {
        if (session._id){
            this.subscribe(this.service.updateSession(session._id, session));
        }
        else {
            this.subscribe(this.service.insertSession(session));
        }
    }
    saveCompletedSession():void {
        var completedSession = this.helper.completeCurrentSession(this.session);
        this.service.updateSession<ICompletedSession>(this.session._id, completedSession).subscribe(
            s => { 
                // this.router.navigate(['/sessions']) - only when all saved
            }, 
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
    
    subscribe<T>(obs: Observable<T>, onSuccess: Function = null): void {
        obs.subscribe(
            response => { if (onSuccess){ onSuccess(response); }},
            error => this.errorMessage = <any>error
        );
    }
}