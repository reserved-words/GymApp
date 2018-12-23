import { Component, Input, } from "@angular/core";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";

@Component({
    selector: 'gym-next-session-exercise',
    templateUrl: 'next-session-exercise.component.html'
})
export class NextSessionExerciseComponent {
    @Input() exercise: IPlannedExercise;

    ngOnInit(): void{
    }
}