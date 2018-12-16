import { Component, Input } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { SessionService } from "./session.service";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class SessionComponent {
    @Input() id: number;
    pageTitle: string = "Session";
    session: ISession;
    errorMessage: string;

    constructor(private sessionService: SessionService){
        
    }

    addExercise():void {
        this.session.exercises.push({ "type" : "?", "warmup": [], "sets": [], "finished": false, "minIncrement": 2.5 });
    }
    markComplete(): void {
        this.session.complete = true;
        for (var i in this.session.exercises){
            this.session.exercises[i].finished = true;
        }
    }
    markNotComplete(): void {
        this.session.complete = false;
    }

    ngOnInit(){
        this.sessionService.getSession('8663e791d5fa6934e5c99737be009dba').subscribe(
            s => {
                this.session = s;
            },
            error => this.errorMessage = <any>error
        );
    }
}