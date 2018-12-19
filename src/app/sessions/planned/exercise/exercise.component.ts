import { Component, Input, EventEmitter, Output } from "@angular/core";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";


@Component({
    selector: 'gym-planned-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class PlannedExerciseComponent {
    @Input() exercise: IPlannedExercise;
    @Output() removeFromSession: EventEmitter<string> = new EventEmitter<string>();
    collapsed: boolean = true;

    ngOnInit(): void{
    }

    addWarmUpSet(): void {
        if (this.exercise.warmup.length){
            var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
            this.exercise.warmup.push({ 
                reps: lastWarmUp.reps, 
                weight: lastWarmUp.weight + this.exercise.minIncrement, 
                quantity: 1 
            });
        }
        else {
            this.exercise.warmup.push({ reps: 1, weight: 1, quantity: 1 });
        }
    }
    removeWarmUpSet(): void {
        if (this.exercise.warmup.length){
            this.exercise.warmup.pop();
        }
    }
    remove() {
        this.removeFromSession.emit(this.exercise.type);
    }
    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
}