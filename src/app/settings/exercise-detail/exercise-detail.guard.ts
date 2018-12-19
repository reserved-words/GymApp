import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ExerciseDetailGuard implements CanActivate {
    canActivate(): boolean {
        return true;
    }
}