import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string = "/";
    
    constructor(private router: Router){}

    isLoggedIn(): boolean {
        console.log(this.id());
        return this.id() != null;
    };
      
    id() : string {
        return localStorage.getItem('auth');
    }
    
    login(username: string, password: string): boolean {
        console.log("Logging in");
        var base64 = btoa(username + ':' + password);
        localStorage.setItem('auth', base64);
        return true;
    }
      
    logout(): void {
        console.log('logging out');
        localStorage.removeItem('auth');
        console.log(this.id());
        this.router.navigate(['/login']);
    }
}