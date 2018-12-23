import { Component, Input, OnInit } from "@angular/core";
import { IConfirmation } from "../../interfaces/confirmation";
import { Router } from "@angular/router";

@Component({
    selector: 'gym-back-confirmation',
    templateUrl: 'back-confirmation.component.html'
})
export class BackConfirmationComponent implements OnInit {
    model: IConfirmation;
    @Input() navigateTo: string;
    
    constructor(private router: Router){        
    }

    ngOnInit(): void {
        this.model = {
            id: "backConfirmationModal",
            title: "Lose Changes?",
            text: "You will lose any unsaved changes. Continue?",
            yesText: "Yes",
            noText: "No"
        };
    }
    
    onRespond(confirmed: boolean){
        if (confirmed){
            this.router.navigate([this.navigateTo]);
        }
    }
}