import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionsService } from "src/app/services/sessions.service";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { SessionHelper } from "src/app/shared/helpers/session.helper";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { IPlannedSession } from "src/app/shared/interfaces/planned-session";
import { ExercisesService } from "src/app/services/exercises.service";
import { Frequency } from "src/app/shared/enums/frequency.enum";
import { Icon } from "src/app/shared/enums/icon.enum";
import { ISaveResponse } from "src/app/shared/interfaces/saveResponse";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { SessionCompleter } from "src/app/shared/helpers/session.completer";

@Component({
    templateUrl: "session.component.html"
})
export class CurrentSessionComponent {
    Icon = Icon;
    pageTitle: string = "Session";
    errorMessage: string;
    session: ICurrentSession;
    plannedSessions: IPlannedSession[];
    numPlannedSessions: number = 3;
    loading: boolean = true;

    constructor(private router: Router, private service: SessionsService, private helper: SessionHelper, private route: ActivatedRoute, 
        private exercisesService: ExercisesService, private completer: SessionCompleter){        
    }

    ngOnInit(){
        this.service.getPlannedSessions(this.numPlannedSessions)
            .then(s => {
                this.plannedSessions = s.rows.map(r => r.value);
            })
            .then(result => {
                let id = this.route.snapshot.paramMap.get('id');
                if (id) {
                    this.service.getSession<ICurrentSession>(id)
                        .then(s => {
                            this.session = s;
                            this.loading = false;
                        });
                }
                else {
                    this.plannedSessions.reverse();
                    var nextPlanned = this.plannedSessions.pop();
                    this.session = this.helper.createCurrentSession(nextPlanned);
                    this.loading = false;
                }
            })
            .catch(err => {
                this.loading = false;
                this.handleError;
            });
    }
    
    markComplete(): void {
        for (var i in this.session.exercises){
            if (!this.session.exercises[i].done || !this.session.exercises[i].nextSessionConfirmed){
                alert("Mark all exercises as done and confirm next session plans first");
                return;
            }
        }

        this.loading = true;

        this.service.updateSession<ICurrentSession>(this.session._id, this.session)
            .then(s => {
                this.session._rev = s.rev;
                return Promise.resolve();
            })
            .then(r => this.completeAndPlanNextSessions())
            .catch(err => {
                this.loading = false;
                this.handleError(err);
            });
    }

    onSave(): void {
        this.loading = true;
        this.service.updateSessions(this.session, this.plannedSessions)
            .then(values => {
                this.loading = false;
                alert("Changes saved");
            })
            .catch(error => {
                this.loading = false;
                this.handleError(error);
            });
    }
    
    handleError(error: any){
        this.errorMessage = <any>error;
        alert(this.errorMessage);
    }

    completeAndPlanNextSessions() {
        var plannedSessions: IPlannedSession[] = [];
        var lastSession: ICompletedSession;
        this.service.getPlannedSessions(this.numPlannedSessions)
            .then(results => {
                plannedSessions = results.rows.map(r => r.value);

                var index = plannedSessions.length > 0 ? plannedSessions[plannedSessions.length-1].index : 0;
                while (plannedSessions.length < this.numPlannedSessions){
                    index++;
                    plannedSessions.push({ _id: null, _rev: null, type: "planned-session", index: index, exercises: [] });
                }
                
                return Promise.resolve();
            })
            .then(r => this.service.getCompletedSessions(1))
            .then(lastSessions => {
                lastSession = lastSessions.rows.map(r => r.value)[0];
                return Promise.resolve();    
            })
            .then(r => this.exercisesService.getExercises())
            .then(exercises => {
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

                return Promise.resolve();
            })
            .then(r => this.saveSessions(plannedSessions))
            .catch(error => {
                this.loading = false;
                this.handleError(error);
            });
    }

    saveSessions(plannedSessions: IPlannedSession[]): void {
        // Ideally shouldn't be hardcoded as 0,1,2 - should be able to change number of sessions
        this.savePlannedSession(plannedSessions[0])
            .then(r0 => this.savePlannedSession(plannedSessions[1]))
            .then(r1 => this.savePlannedSession(plannedSessions[2]))
            .then(r2 => this.saveCompletedSession())
            .then(r3 => {
                this.loading = false;
                this.router.navigate(['/sessions']);
            })
            .catch(error => {
                this.loading = false;
                this.handleError(error);
            });
    }

    savePlannedSession(session: IPlannedSession): Promise<ISaveResponse> {
        if (session._id){
            return this.service.updateSession(session._id, session);
        }
        else {
            return this.service.insertSession(session);
        }
    }

    saveCompletedSession(): Promise<ISaveResponse> {
        return this.completer.completeCurrentSession(this.session)
            .then(completedSession => {
                return this.service.updateSession<ICompletedSession>(this.session._id, completedSession);
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

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.session.exercises, event.previousIndex, event.currentIndex);
    }
}