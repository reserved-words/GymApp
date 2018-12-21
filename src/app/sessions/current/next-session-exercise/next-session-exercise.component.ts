import { Component, Input, } from "@angular/core";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";

@Component({
    selector: 'gym-next-session-exercise',
    templateUrl: 'next-session-exercise.component.html',
    styleUrls: ['next-session-exercise.component.css']
})
export class NextSessionExerciseComponent {
    @Input() exercise: IPlannedExercise;

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
}