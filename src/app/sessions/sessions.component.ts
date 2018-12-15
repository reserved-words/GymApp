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

    constructor(private sessionsService: SessionsService){
    }

    add(): void {
        alert("Add exercise!");
    }
    edit(): void {
        alert("Edit exercise!");
    }

    ngOnInit(): void {
        this.list = this.sessionsService.getSessions();
    }
}