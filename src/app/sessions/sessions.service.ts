import { Injectable } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { Session } from "../shared/model/session";

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    getSessions(): ISession[]{
        return [
            new Session(1, new Date('2018-12-09 10:00:00'), false),
            new Session(2, new Date('2018-12-06 19:00:00'), true),
            new Session(3, new Date('2018-12-03 19:00:00'), true)
        ];
    };
}