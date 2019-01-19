import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionsService } from "src/app/services/sessions.service";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { SessionsHelper } from "src/app/shared/helpers/sessions.helper";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { ExercisesService } from "src/app/services/exercises.service";
import { Frequency } from "src/app/shared/enums/frequency.enum";
import { ICurrentExercise } from "src/app/shared/interfaces/current-exercise";

@Component({
    templateUrl: "session.component.html"
})
export class CurrentSessionComponent {
    pageTitle: string = "Session";
    errorMessage: string;
    session: ICurrentSession;

    constructor(private service: SessionsService, private helper: SessionsHelper, private route: ActivatedRoute, private exercisesService: ExercisesService){        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.subscribe(this.service.getSession<ICurrentSession>(id), s => {
                this.session = s
            });
        }
        else {
            this.service.subscribe(this.service.getPlannedSessions(1), s => {
                this.session = this.helper.createCurrentSession(s.rows[0].value);
            });
        }
    }

    addExercise(exerciseToAdd: ICurrentExercise):void {
        this.session.exercises.push(exerciseToAdd);
    }
    
    markComplete(): void {
        for (var i in this.session.exercises){
            if (!this.session.exercises[i].done || !this.session.exercises[i].nextSessionConfirmed){
                alert("Mark all exercises as done and confirm next session plans first");
                return;
            }
        }

        this.service.subscribe(this.service.updateSession<ICurrentSession>(this.session._id, this.session),
            s => {
                this.session._rev = s.rev;
                this.completeAndPlanNextSessions();
            });
    }
    onSave(): void {
        this.service.updateSession<ICurrentSession>(this.session._id, this.session).subscribe(
            s => {
                this.session._rev = s.rev;
                alert("Changes saved");
            },
            error => this.handleError(error)
        );
    }
    handleError(error: any){
        this.errorMessage = <any>error;
        alert(this.errorMessage);
    }

    completeAndPlanNextSessions() {
        this.service.subscribe(this.service.getPlannedSessions(3),
            results => {
                var plannedSessions = results.rows.map(r => r.value);

                var index = plannedSessions.length > 0 ? plannedSessions[plannedSessions.length-1].index : 0;
                while (plannedSessions.length < 3){
                    index++;
                    plannedSessions.push({ _id: null, _rev: null, type: "planned-session", index: index, exercises: [] });
                }

                this.service.subscribe(this.service.getCompletedSessions(1), lastSessions => {
                    var lastSession = lastSessions.rows.map(r => r.value)[0];
                    this.service.subscribe(this.exercisesService.getExercises(), exercises => {
                        for (let ex of this.session.exercises){
                            
                            var def = exercises.rows.map(r => r.value).filter(r => r.name === ex.type)[0];
        
                            var nextSessionIndex =
                                (def.frequency == Frequency.EverySession ? 1 :
                                (def.frequency == Frequency.EveryOtherSession ? 2 :
                                (def.frequency == Frequency.EveryThirdSession ? 3 : 1)));
        
                            if (def.frequency == Frequency.TwoInEveryThreeSessions){
                                var exerciseInLastSession = lastSession.exercises.filter(ex => ex.type === def.name);
                                var doneInPreviousSession = exerciseInLastSession.length > 0;                        
                                nextSessionIndex = doneInPreviousSession ? 2 : 1;
                            }
        
                            var nextSession = plannedSessions[nextSessionIndex-1];
                            nextSession.exercises.push(ex.nextSession);
                        }
        
                        // Need to know when ALL save processes finished so can return to home page
                        this.saveSessions(plannedSessions);
                    })    
                })
            }
        );
    }

    saveSessions(plannedSessions: IPlannedSession[]){
        for (let session of plannedSessions){
            this.savePlannedSession(session);
        }
        this.saveCompletedSession();
    }

    savePlannedSession(session: IPlannedSession): void {
        if (session._id){
            this.service.subscribe(this.service.updateSession(session._id, session));
        }
        else {
            this.service.subscribe(this.service.insertSession(session));
        }
    }
    saveCompletedSession():void {
        var completedSession = this.helper.completeCurrentSession(this.session);
        this.service.updateSession<ICompletedSession>(this.session._id, completedSession).subscribe(
            s => { 
                // this.router.navigate(['']) - only when all saved
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
}