import { AuthService } from "./auth.service";
import { DBService } from "./db.service";

export class BaseService {
    constructor(private dbService: DBService, private auth: AuthService){}

    onAuthError(): void {
        this.auth.logout();
    }
}