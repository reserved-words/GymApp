import { Component, Input } from "@angular/core";
import { ICompletedExercise } from "../shared/interfaces/completed-exercise";


@Component({
    selector: 'gym-completed-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class CompletedExerciseComponent {
    @Input() exercise: ICompletedExercise;
    collapsed: boolean = true;

    ngOnInit(): void {
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
}