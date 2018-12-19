import { Component, Input } from "@angular/core";
import { ISet } from "src/app/shared/interfaces/set";


@Component({
    selector: 'gym-planned-set',
    templateUrl: 'set.component.html',
    styleUrls: ['set.component.css']
})
export class PlannedSetComponent {
    @Input() set: ISet;
    @Input() stepSize: number;

    onWeightValueChanged(newValue: number): void {
        this.set.weight = newValue;
    }
    onRepsValueChanged(newValue: number): void {
        this.set.reps = newValue;
    }
    onQuantityValueChanged(newValue: number): void {
        this.set.quantity = newValue;
    }
}