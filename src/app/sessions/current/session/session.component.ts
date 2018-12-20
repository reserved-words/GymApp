import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionsService } from "src/app/services/sessions/sessions.service";
import { ICurrentSession } from "src/app/shared/interfaces/current-session";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { SessionsHelper } from "src/app/shared/helpers/sessions.helper";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CurrentSessionComponent {
    pageTitle: string = "Session";
    errorMessage: string;
    session: ICurrentSession;

    constructor(private service: SessionsService, private helper: SessionsHelper, private route: ActivatedRoute, private router: Router){        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        if (id){
            this.service.getSession<ICurrentSession>(id).subscribe(
                s => {
                    this.session = s;
                },
                error => this.errorMessage = <any>error
            );
        }
        else{
            this.service.getNextSession().subscribe(
                s => {
                    this.session = this.helper.createCurrentSession(s.rows[0].value);
                },
                error => this.errorMessage = <any>error
            );
        }
    }
    
    addExercise():void {
        this.session.exercises.push({ "type" : "?", "warmup": [], "sets": [], "minIncrement": 2.5, "done": false });
    }

    markComplete(): void {
        // alert("Add a check to confirm completion");
        var completedSession = this.helper.completeCurrentSession(this.session);
        this.service.saveSession<ICompletedSession>(this.session._id, completedSession).subscribe(
            s => {
                alert("Saved");
                this.router.navigate(['/sessions']);    
            },
            error => this.errorMessage = <any>error
        );
    }
    onBack(): void {
        alert("Add a check to confirm losing changes");
        this.router.navigate(['/sessions']);
    }
    onSave(): void {
        this.service.saveSession<ICurrentSession>(this.session._id, this.session).subscribe(
            s => {
                this.session._rev = s.rev;
                alert("Success");
            },
            error => {
                this.errorMessage = <any>error;
                alert(this.errorMessage);
            }
        );
    }
}