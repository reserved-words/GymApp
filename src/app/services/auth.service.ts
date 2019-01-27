import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggedIn: boolean;
    redirectUrl: string = "/";
    
    constructor(private router: Router){}

    isLoggedIn(): boolean {
        return this.loggedIn && this.id() != null;
    };
      
    id() : string {
       return !this.loggedIn ? null : atob(localStorage.getItem('authID'));
    }
    
    login(username: string, password: string): void {
        var base64 = btoa(username + ':' + password);
        localStorage.setItem('authID', base64);
        this.loggedIn = true;
    }
      
    logout(): void {
        localStorage.removeItem('authID');
        this.loggedIn = false;
    }
}