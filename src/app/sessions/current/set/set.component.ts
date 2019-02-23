import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ICurrentSet } from "src/app/shared/interfaces/current-set";


@Component({
    selector: 'gym-current-set',
    templateUrl: 'set.component.html'
})
export class CurrentSetComponent {
    @Input() set: ICurrentSet;
    @Input() stepSize: number;
    @Output() saveChanges: EventEmitter<void> = new EventEmitter<void>();

    onWeightValueChanged(newValue: number): void {
        this.set.weight = newValue;
    }
    
    onRepsValueChanged(newValue: number): void {
        this.set.reps = newValue;
    }

    markDone(): void {
        this.set.done = true;
        this.saveChanges.emit();
    }

    markNotDone(): void {
        this.set.done = false;
        this.saveChanges.emit();
    }
}