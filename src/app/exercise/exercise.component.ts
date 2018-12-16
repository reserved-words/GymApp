import { Component, OnInit, Input } from "@angular/core";
import { IExercise } from "../shared/interfaces/exercise";
import { ExerciseService } from "./exercise.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
    pageTitle: string = 'Edit Exercise';
    exercise: IExercise;
    errorMessage: string;

    constructor(private service: ExerciseService, private route: ActivatedRoute){
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');

        this.service.getExercise(id).subscribe(
            ex => this.exercise = ex,
            error => this.errorMessage = <any>error
        );
    }
    
    save(): void {
        alert("Save");
    }
}