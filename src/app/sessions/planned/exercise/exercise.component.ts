import { Component, Input, EventEmitter, Output } from "@angular/core";
import { IPlannedExercise } from "src/app/shared/interfaces/planned-exercise";
import { ExercisesService } from "src/app/services/exercises.service";


@Component({
    selector: 'gym-planned-exercise',
    templateUrl: 'exercise.component.html',
    styleUrls: ['exercise.component.css']
})
export class PlannedExerciseComponent {
    @Input() exercise: IPlannedExercise;
    @Output() removeFromSession: EventEmitter<string> = new EventEmitter<string>();
    collapsed: boolean = true;

    constructor(private service: ExercisesService){}

    addWarmUpSet(): void {

        this.service.getExercises().subscribe(
            response => {
                var def = response.rows.map(r => r.value).filter(r => r.name === this.exercise.type)[0];
                if (this.exercise.warmup.length){
                    var lastWarmUp = this.exercise.warmup[this.exercise.warmup.length-1];
                    this.exercise.warmup.push({ 
                        reps: lastWarmUp.reps, 
                        weight: lastWarmUp.weight + def.minIncrement, 
                        quantity: 1 
                    });
                }
                else {
                    this.exercise.warmup.push({ reps: 1, weight: def.minWeight, quantity: 1 });
                }        
            },
            error => alert(<any>error)
        );
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