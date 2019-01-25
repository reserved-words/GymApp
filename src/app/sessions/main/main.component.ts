import { Component } from "@angular/core";
import { SessionsService } from "../../services/sessions.service";
import { Router } from "@angular/router";
import { ICompletedSession } from "../../shared/interfaces/completed-session";
import { Icon } from "src/app/shared/enums/icon.enum";

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css']
})
export class SessionsMainComponent {
    Icon = Icon;
    completed: ICompletedSession[] = [];
    planned: any[] = [];
    errorMessage: string;
    currentSessionID: string;
    startSessionText: string;
    
    constructor(private service: SessionsService, private router: Router){
    }

    goToCompletedSession(id: string){
        this.router.navigate(['/completed/' + id]);
    }
    goToPlannedSession(id: string){
        this.router.navigate(['/planned/' + id]);
    }
    startNextSession(): void {
        var url = this.currentSessionID ? ('/start/' + this.currentSessionID) : '/start';
        this.router.navigate([url]);
    }

    ngOnInit(): void {
        this.service.subscribe(this.service.getCompletedSessions(3), result => this.completed = result.rows.map(r => r.value));
        this.service.subscribe(this.service.getPlannedSessions(3), result => {
            for (var i in result.rows){
                var index = parseInt(i) + 1;
                this.planned.push({ index: index, id: result.rows[i].value._id });
            }
        });
        this.service.subscribe(this.service.getCurrentSession(), result => {
            this.currentSessionID = result.total_rows > 0 ? result.rows[0].value._id : null;
            this.startSessionText = this.currentSessionID ? "Resume Current Session" : "Start Next Session";
        });
    }
}