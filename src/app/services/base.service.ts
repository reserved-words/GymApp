import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

export class BaseService {
    constructor(private auth: AuthService){}

    onAuthError(): void {
        this.auth.logout();
    }

    // subscribe<T>(obs: Observable<T>, onSuccess: Function = null, onError: Function = null): void {
    //     obs.subscribe(
    //         response => { 
    //             if (onSuccess){ 
    //                 onSuccess(response); 
    //             }},
    //         error => {                
    //             if (error === 'unauthorized'){
    //                 this.onAuthError();
    //             }
    //             console.error(error);
    //             if (onError){
    //                 onError(error);
    //             }
    //         }
    //     );
    // }
}