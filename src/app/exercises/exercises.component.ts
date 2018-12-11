import { Component } from "@angular/core";

@Component({
    selector: 'gym-exercises',
    templateUrl: 'exercises.component.html'
})
export class ExercisesComponent {
    pageTitle: string = 'Exercises';
    list: any[] = [
        { id:1, name: "Bench press", icon: "dumbbell" },
        { id:2, name: "Chin-up", icon: "dumbbell" },
        { id:3, name: "Deadlift", icon: "dumbbell" },
        { id:4, name: "Dip", icon: "dumbbell" },
        { id:5, name: "Pull-up", icon: "dumbbell" },
        { id:6, name: "Shoulder press", icon: "dumbbell" },
        { id:7, name: "Squat", icon: "dumbbell" },
        { id:8, name: "Tricep extension", icon: "dumbbell" }
    ];
    edit(): void {
        alert("Edit exercise!");
    }
}