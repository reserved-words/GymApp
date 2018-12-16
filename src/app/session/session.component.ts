import { Component, Input } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { SessionService } from "./session.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class SessionComponent {
    pageTitle: string = "Session";
    session: ISession;
    errorMessage: string;
    started: boolean;
    sessionStatus: string;

    constructor(private service: SessionService, private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
        this.started = this.route.snapshot.paramMap.has('start');
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getSession(id).subscribe(
            s => {
                this.session = s;
                this.sessionStatus = this.started
                    ? "started"
                    : this.session.complete
                    ? "completed"
                    : "planned";
                if (this.started){
                    this.session.date = new Date();
                }
            },
            error => this.errorMessage = <any>error
        );
    }

    addExercise():void {
        this.session.exercises.push({ "type" : "?", "warmup": [], "sets": [], "finished": false, "minIncrement": 2.5 });
    }
    markComplete(): void {
        // Save time completed
        alert("Add a check to confirm completion");
        for (var i in this.session.exercises){
            for (var j in this.session.exercises[i].sets){
                this.session.exercises[i].sets[j].done = true;
            }
            this.session.exercises[i].finished = true;
        }
        this.session.complete = true;
        this.router.navigate(['/sessions']);
    }
    markNotComplete(): void {
        this.session.complete = false;
    }
    onBack(): void {
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        // save
        this.router.navigate(['/sessions']);
    }
}