import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ICompletedExercise } from "src/app/shared/interfaces/completed-exercise";
import { ISet } from "src/app/shared/interfaces/set";


@Component({
    selector: 'gym-completed-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class CompletedExerciseComponent implements OnInit, OnChanges {
    @Input() exercise: ICompletedExercise;
    @Input() showWarmups: boolean;
    collapsed: boolean = false;
    warmups: ISet[];

    ngOnInit(): void {
        this.updateWarmups();
    }

    ngOnChanges(): void {
        this.updateWarmups();
    }

    updateWarmups() {
        this.warmups = this.showWarmups ? this.exercise.warmup : [];
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }
}