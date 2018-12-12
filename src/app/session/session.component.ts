import { Component } from "@angular/core";
import { ISession } from "../shared/interfaces/session";
import { ExerciseSet } from "../shared/model/exercise-set";
import { SessionExercise } from "../shared/model/session-exercise";

@Component({
    selector: "gym-session",
    templateUrl: "session.component.html",
    styleUrls: ["session.component.css"]
})
export class SessionComponent {
    pageTitle: string = "Session";
    session: ISession;

    constructor(){
        this.session = {
            id: 1,
            date: new Date(),
            exercises: []
        };

        var bp = new SessionExercise("Bench Press");
        bp.warmup = [
            new ExerciseSet(10,8,true),
            new ExerciseSet(15,5,true)
        ];
        bp.sets = [
            new ExerciseSet(20,5,true),
            new ExerciseSet(20,5,true),
            new ExerciseSet(20,5,false),
            new ExerciseSet(20,5,false),
            new ExerciseSet(20,5,false),
        ];
        this.session.exercises.push(bp);
    }

    addExercise() {
        this.session.exercises.push(new SessionExercise("?"));
    }
}