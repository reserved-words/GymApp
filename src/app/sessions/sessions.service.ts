import { Injectable } from "@angular/core";
import { ISession } from "../shared/interfaces/session";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    getSessions(): ISession[]{
        return [
            { id:1, date: new Date('2018-12-09 10:00:00'), exercises: [] },
            { id:2, date: new Date('2018-12-06 19:00:00'), exercises: [] },
            { id:3, date: new Date('2018-12-03 19:00:00'), exercises: [] },
        ];
    };
}