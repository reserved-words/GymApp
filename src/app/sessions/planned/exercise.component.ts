import { Component, Input } from "@angular/core";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";


@Component({
    selector: 'gym-planned-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class PlannedExerciseComponent {
    @Input() exercise: IPlannedExercise;
    collapsed: boolean = true;

    ngOnInit(): void{
    }

    addWarmUpSet(): void {
        // if (this.exercise.warmup.length){
        //     var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
        //     this.exercise.warmup.push({ reps: lastWarmUp.reps, weight: lastWarmUp.weight });
        // }
        // else {
        //     this.exercise.warmup.push({ reps: 1, weight: 0 });
        // }
    }
    addSet(): void {
        // if (this.exercise.sets.length){
        //     var lastSet = this.exercise.sets[this.exercise.sets.length-1];
        //     this.exercise.sets.push({ reps: lastSet.reps, weight: lastSet.weight });
        // }
        // else if (this.exercise.warmup.length){
        //     var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
        //     this.exercise.sets.push({ reps: lastWarmUp.reps, weight: lastWarmUp.weight });
        // }
        // else {
        //     this.exercise.sets.push({ reps: 1, weight: 0 });
        // }
    }
    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
}