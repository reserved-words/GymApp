import { Component } from "@angular/core";
import * as moment from 'moment';

@Component({
    selector: 'gym-sessions',
    templateUrl: 'sessions.component.html'
})
export class SessionsComponent {
    pageTitle: string = "Sessions";
    list: any[] = [
        {
            day: moment(new Date('2018-12-09 10:00:00')).format("dddd"), 
            date: moment(new Date('2018-12-09 10:00:00')).format("DD/MM/YYYY"),
            time: moment(new Date('2018-12-09 10:00:00')).format("HH:mm"),
        },
        {
            day: moment(new Date('2018-12-06 19:00:00')).format("dddd"), 
            date: moment(new Date('2018-12-06 19:00:00')).format("DD/MM/YYYY"),
            time: moment(new Date('2018-12-06 19:00:00')).format("HH:mm")
        },
        {
            day: moment(new Date('2018-12-03 19:00:00')).format("dddd"), 
            date: moment(new Date('2018-12-03 19:00:00')).format("DD/MM/YYYY"), 
            time: moment(new Date('2018-12-03 19:00:00')).format("HH:mm")
        },
    ];
}