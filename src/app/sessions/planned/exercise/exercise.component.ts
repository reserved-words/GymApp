import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";
import { ExercisesService } from "src/app/services/exercises.service";
import { IExercise } from "src/app/shared/interfaces/exercise";

@Component({
    selector: 'gym-planned-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class PlannedExerciseComponent implements OnInit {
    @Input() exercise: IPlannedExercise;
    @Output() removeFromSession: EventEmitter<string> = new EventEmitter<string>();
    collapsed: boolean = true;
    def: IExercise;

    constructor(private service: ExercisesService){}

    ngOnInit(): void {
        this.service.subscribe(this.service.getExercises(), response => {
            this.def = response.rows.map(r => r.value).filter(r => r.name === this.exercise.type)[0];
        });
    }

    addWarmUpSet(): void {
        if (this.exercise.warmup.length){
            var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
            this.exercise.warmup.push({ 
                reps: lastWarmUp.reps, 
                weight: lastWarmUp.weight + this.def.minIncrement, 
                quantity: 1 
            });
        }
        else {
            this.exercise.warmup.push({ reps: this.def.minReps, weight: this.def.minWeight, quantity: 1 });
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