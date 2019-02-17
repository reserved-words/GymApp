import { Component, Input } from "@angular/core";
import { ExercisesService } from "src/app/services/exercises.service";
import { SessionPlanner } from "../../helpers/session.planner";
import { IExercise } from "../../interfaces/exercise";
import { IPlannedSession } from "../../interfaces/planned-session";
import { ICurrentSession } from "../../interfaces/current-session";

@Component({
    selector: 'gym-add-exercise',
    templateUrl: 'add-exercise.component.html'
})
export class AddExerciseComponent{
    addExerciseType: string;
    exerciseToAdd: any;
    exercises: IExercise[];
    @Input() id: string;
    @Input() planned: IPlannedSession[];
    @Input() current: ICurrentSession;

    constructor(private exercisesService: ExercisesService, private planner: SessionPlanner){}

    ngOnInit(){
        this.exercisesService.getExercises().then(r => {
            this.exercises = r.rows.map(row => row.value);
        });
    }

    addExercise():void {
        
        var def = this.exercises.filter(ex => ex.name === this.addExerciseType)[0];

        if (this.current != null && this.current._id === this.id){
            this.planner.addToCurrentSession(this.current, this.planned, def)
                .then(() => { this.finish(); });
        }
        else {
            var session = this.planned.filter(s => s._id === this.id)[0];
            this.planner.addToPlannedSession(session, this.planned, this.current, def)
                .then(() => { this.finish(); });
        }
    }

    finish(): void {
        this.addExerciseType = null;
    }
}