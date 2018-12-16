import { Component } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { SessionsService } from "./sessions.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'sessions.component.html',
    styleUrls: ['sessions.component.css']
})
export class SessionsComponent {
    pageTitle: string = "Sessions";
    completed: ISession[] = [];
    planned: any[] = [];
    errorMessage: string;
    
    constructor(private service: SessionsService, private router: Router){
    }

    add(): void {
        alert("Add session!");
    }
    edit(): void {
        alert("Edit session!");
    }
    goToSession(id: string){
        this.router.navigate(['/sessions/' + id]);
    }
    startNextSession(): void {
        if (this.planned.length){
            let nextSessionID = this.planned[0].id;
            this.router.navigate(['/sessions/start/' + nextSessionID]);
        }
    }

    ngOnInit(): void {
        this.service.getCompletedSessions().subscribe(
            result => {
                for (var i in result.rows){
                    this.completed.push(result.rows[i].value);
                }
            },
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
    }
}