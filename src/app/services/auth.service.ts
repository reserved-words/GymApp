import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string = "/";
    
    constructor(private router: Router){}

    isLoggedIn(): boolean {
        return this.id() != null;
    };
      
    id() : string {
       return atob(localStorage.getItem('authID'));
    }
    
    login(username: string, password: string): boolean {
        var base64 = btoa(username + ':' + password);
        localStorage.setItem('authID', base64);
        return true;
    }
      
    logout(): void {
        localStorage.removeItem('authID');
    }
}