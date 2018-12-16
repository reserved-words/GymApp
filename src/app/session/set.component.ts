import { Component, Input } from "@angular/core";
import { ISet } from "../shared/interfaces/set";


@Component({
    selector: 'gym-set',
    templateUrl: 'set.component.html',
    styleUrls: ['set.component.css']
})
export class SessionSetComponent {
    @Input() set: ISet;
    @Input() exerciseFinished: boolean;
    @Input() stepSize: number;
    @Input() sessionStatus: string;

    onWeightValueChanged(newValue: number): void {
        this.set.weight = newValue;
    }
    
    onRepsValueChanged(newValue: number): void {
        this.set.reps = newValue;
    }

    markDone(): void {
        this.set.done = true;
    }

    markNotDone(): void {
        this.set.done = false;
    }
}