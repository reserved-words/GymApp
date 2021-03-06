import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICompletedSession } from "src/app/shared/interfaces/completed-session";
import { SessionsService } from "src/app/services/sessions.service";
import { Icon } from "src/app/shared/enums/icon.enum";

@Component({
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class CompletedSessionComponent {
    Icon = Icon;
    session: ICompletedSession;
    errorMessage: string;
    hasExercises: boolean;
    showWarmups: boolean;
    loading: boolean = true;
    
    constructor(private service: SessionsService, private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
        let id = this.route.snapshot.paramMap.get('id');
        this.service.getSession<ICompletedSession>(id)
            .then(response => {
                this.session = response;
                this.hasExercises = this.session.exercises.length > 0;
                this.loading = false;
            })
            .catch(err =>  alert(err.message));;
    }

    onBack(): void {
        this.router.navigate(['']);
    }

    toggleWarmups(): void {
        this.showWarmups = !this.showWarmups;
    }
}