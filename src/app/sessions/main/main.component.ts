import { Component } from "@angular/core";
import { SessionsService } from "../../services/sessions/sessions.service";
import { Router } from "@angular/router";
import { ICompletedSession } from "../../shared/interfaces/completed-session";

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
        this.service.getCompletedSessions().subscribe(
            result => this.completed = result.rows.map(r => r.value),
            error => this.errorMessage = <any>error
        );
        this.service.getPlannedSessions().subscribe(
            result => {
                for (var i in result.rows){
                    var index = parseInt(i) + 1;
                    this.planned.push({ index: index, id: result.rows[i].value._id });
                }
            },
            error => this.errorMessage = <any>error
        );
        this.service.getCurrentSession().subscribe(
            result => {
                this.currentSessionID = result.total_rows > 0 ? result.rows[0].value._id : null;
                this.startSessionText = this.currentSessionID ? "Resume Current Session" : "Start Next Session";
            },
            error => this.errorMessage = <any>error
        );
    }
}