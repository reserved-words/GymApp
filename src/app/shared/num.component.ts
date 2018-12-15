import { Component, Input } from "@angular/core";

@Component({
    selector: 'gym-num',
    templateUrl: 'num.component.html',
    styleUrls:['num.component.css']
})
export class NumComponent{
    @Input() value: number;
    @Input() stepSize; number;

    increase(): void {
        this.value = this.value + this.stepSize;
    }
    
    decrease(): void {
        this.value = this.value - this.stepSize;
    }
}