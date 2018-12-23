import { Component } from "@angular/core";
import { SessionsService } from "../../services/sessions.service";
import { Router } from "@angular/router";
import { ICompletedSession } from "../../shared/interfaces/completed-session";
import { Observable } from "rxjs";

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css']
})
export class SessionsMainComponent {
    pageTitle: string = "Sessions";
    completed: ICompletedSession[] = [];
    planned: any[] = [];
    errorMessage: string;
    currentSessionID: string;
    startSessionText: string;
    
    constructor(private service: SessionsService, private router: Router){
    }

    add(): void {
        alert("Add session!");
    }
    edit(): void {
        alert("Edit session!");
    }
    goToCompletedSession(id: string){
        this.router.navigate(['/sessions/completed/' + id]);
    }
    goToPlannedSession(id: string){
        this.router.navigate(['/sessions/planned/' + id]);
    }
    startNextSession(): void {
        var url = this.currentSessionID ? ('/sessions/start/' + this.currentSessionID) : '/sessions/start';
        this.router.navigate([url]);
    }

    ngOnInit(): void {
        this.subscribe(this.service.getCompletedSessions(3), result => this.completed = result.rows.map(r => r.value));
        this.subscribe(this.service.getPlannedSessions(), result => {
            for (var i in result.rows){
                var index = parseInt(i) + 1;
                this.planned.push({ index: index, id: result.rows[i].value._id });
            }
        });
        this.subscribe(this.service.getCurrentSession(), result => {
            this.currentSessionID = result.total_rows > 0 ? result.rows[0].value._id : null;
            this.startSessionText = this.currentSessionID ? "Resume Current Session" : "Start Next Session";
        });
    }

    subscribe<T>(obs: Observable<T>, onSuccess: Function = null): void {
        obs.subscribe(
            response => { if (onSuccess){ onSuccess(response); }},
            error => this.errorMessage = <any>error
        );
    }
}