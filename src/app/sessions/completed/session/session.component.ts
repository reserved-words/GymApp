import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { SessionsService } from "src/app/services/sessions.service";
import { Observable } from "rxjs";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CompletedSessionComponent {
    pageTitle: string = "Session";
    session: ICompletedSession;
    errorMessage: string;
    hasExercises: boolean;

    constructor(private service: SessionsService, private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.subscribe(this.service.getSession<ICompletedSession>(id), result => {
            this.session = result;
            this.hasExercises = this.session.exercises.length > 0;
        });
    }

    onBack(): void {
        this.router.navigate(['/sessions']);
    }

    subscribe<T>(obs: Observable<T>, onSuccess: Function = null): void {
        obs.subscribe(
            response => { if (onSuccess){ onSuccess(response); }},
            error => this.errorMessage = <any>error
        );
    }
}