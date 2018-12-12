import { Component } from "@angular/core";
import { ISession } from "../shared/interfaces/session";

@Component({
    selector: 'gym-sessions',
    templateUrl: 'sessions.component.html',
    styleUrls: ['sessions.component.css']
})
export class SessionsComponent {
    pageTitle: string = "Sessions";
    sessionIcon: string = "calendar-alt";
    list: ISession[] = [
        { id:1, date: new Date('2018-12-09 10:00:00'), exercises: [] },
        { id:2, date: new Date('2018-12-06 19:00:00'), exercises: [] },
        { id:3, date: new Date('2018-12-03 19:00:00'), exercises: [] },
    ];
    add(): void {
        alert("Add exercise!");
    }
    edit(): void {
        alert("Edit exercise!");
    }
}