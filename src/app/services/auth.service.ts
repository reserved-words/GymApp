import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string = "/";
    
    isLoggedIn(): boolean {
        return localStorage.getItem('authID') != null;
    };
      
    id() : string {
       return atob(localStorage.getItem('authID'));
    }
    
    login(username: string, password: string): void {
        var base64 = btoa(username + ':' + password);
        localStorage.setItem('authID', base64);
    }
      
    logout(): void {
        localStorage.removeItem('authID');
    }
}