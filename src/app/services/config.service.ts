import { Injectable } from "@angular/core";
import { IAppConfig } from "../shared/interfaces/app-config";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    static settings: IAppConfig;

    constructor(private http: HttpClient){}

    load(){
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                ConfigService.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}