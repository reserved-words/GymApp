import { Component } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { SessionsService } from "./sessions.service";

@Component({
    selector: 'gym-sessions',
    templateUrl: 'sessions.component.html',
    styleUrls: ['sessions.component.css']
})
export class SessionsComponent {
    pageTitle: string = "Sessions";
    sessionIcon: string = "calendar-alt";
    list: ISession[];
    errorMessage: string;

    constructor(private sessionsService: SessionsService){
    }

    add(): void {
        alert("Add session!");
    }
    edit(): void {
        alert("Edit session!");
    }

    ngOnInit(): void {
        this.sessionsService.getSessions().subscribe(
            result => this.list = result,
            error => this.errorMessage = <any>error
        );
    }
}