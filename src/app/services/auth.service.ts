import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string = "/";
    private authID: string;
    
    constructor(private router: Router){}

    isLoggedIn(): boolean {
        return this.id() != null;
    };
      
    id() : string {
        return this.authID;
        // return localStorage.getItem('auth');
    }
    
    login(username: string, password: string): boolean {
        var base64 = btoa(username + ':' + password);
        this.authID = base64;
        // localStorage.setItem('auth', base64);
        return true;
    }
      
    logout(): void {
        this.authID = null;
        // localStorage.removeItem('auth');
    }
}