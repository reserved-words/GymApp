import { Component, Input } from "@angular/core";
import { SessionService } from "./session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CompletedSessionComponent {
    pageTitle: string = "Session";
    session: ICompletedSession;
    errorMessage: string;
    hasExercises: boolean;

    constructor(private service: SessionService, private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getSession(id).subscribe(
            result => {
                this.session = result;
                this.hasExercises = this.session.exercises.length > 0;
            },
            error => this.errorMessage = <any>error
        );
    }

    onBack(): void {
        this.router.navigate(['/sessions']);
    }
}