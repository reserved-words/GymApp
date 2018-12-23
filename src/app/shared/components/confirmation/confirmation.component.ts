import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { IConfirmation } from "../../interfaces/confirmation";

@Component({
    selector: 'gym-confirmation',
    templateUrl: 'confirmation.component.html'
})
export class ConfirmationComponent {
    @Input() model: IConfirmation;
    @Output() onRespond: EventEmitter<boolean> = new EventEmitter<boolean>();

    onYes(){
        this.onRespond.emit(true);
    }

    onNo(){
        this.onRespond.emit(false);
    }
}