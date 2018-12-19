import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'gym-num',
    templateUrl: 'num.component.html',
    styleUrls:['num.component.css']
})
export class NumComponent{
    @Input() value: number;
    @Input() stepSize: number;
    @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();

    increase(): void {
        this.value = this.value + this.stepSize;
        this.onValueChanged();
    }
    
    decrease(): void {
        this.value = this.value - this.stepSize;
        this.onValueChanged();
    }

    onValueChanged(): void {
        this.valueChanged.emit(this.value);
    }
}