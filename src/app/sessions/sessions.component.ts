import { Component } from "@angular/core";
import { ISession } from "../interfaces/session";

@Component({
    selector: 'gym-sessions',
    templateUrl: 'sessions.component.html'
})
export class SessionsComponent {
    pageTitle: string = "Sessions";
    sessionIcon: string = "calendar-alt";
    list: ISession[] = [
        { id:1, date: new Date('2018-12-09 10:00:00') },
        { id:2, date: new Date('2018-12-06 19:00:00') },
        { id:3, date: new Date('2018-12-03 19:00:00') },
    ];
    add(): void {
        alert("Add exercise!");
    }
    edit(): void {
        alert("Edit exercise!");
    }
}