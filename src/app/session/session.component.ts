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

    constructor(private service: SessionService, private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getSession(id).subscribe(
            s => {
                this.session = s;
            },
            error => this.errorMessage = <any>error
        );
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
    onBack(): void {
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        // save
        this.router.navigate(['/sessions']);
    }
}