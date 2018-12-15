import { Component, Input } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { ExerciseSet } from "../shared/model/exercise-set";
import { SessionExercise } from "../shared/model/session-exercise";
import { SessionService } from "./session.service";

@Component({
    selector: "gym-session",
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class SessionComponent {
    @Input() id: number;
    pageTitle: string = "Session";
    session: ISession;

    constructor(private sessionService: SessionService){
        
    }

    addExercise() {
        this.session.exercises.push(new SessionExercise("?"));
    }

    ngOnInit(){
        this.session = this.sessionService.getSession(this.id)
    }
}