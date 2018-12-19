import { Component, OnInit, Input } from "@angular/core";
import { IExercise } from "../../shared/interfaces/exercise";
import { ExerciseDetailService } from "./exercise-detail.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: './exercise-detail.component.html',
    styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
    pageTitle: string = 'Edit Exercise';
    exercise: IExercise;
    errorMessage: string;

    constructor(private service: ExerciseDetailService, private route: ActivatedRoute, private router: Router){
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');

        this.service.getExercise(id).subscribe(
            ex => this.exercise = ex,
            error => this.errorMessage = <any>error
        );
    }

    onBack(): void {
        this.router.navigate(['/settings']);
    }
    
    onSave(): void {
        // save
        this.router.navigate(['/settings']);
    }
}