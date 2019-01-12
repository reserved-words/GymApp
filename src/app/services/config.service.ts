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

        // TODO: Fetch from config file. Not currently working.
        ConfigService.settings = {
            api: {
                baseUrl: "http://40.84.141.106:5984/gymapp/",
                // baseUrl: environment.production ? "http://127.0.0.1:5984/gymapp/" :  "http://40.84.141.106:5984/gymapp/",
                auth: "Basic ZGJ1c2VyOlBhc3N3b3JkMQ=="
            }
        };

        // const jsonFile = `assets/config/config.${((environment.production) ? 'deploy' : 'dev')}.json`;
        // return new Promise<void>((resolve, reject) => {
        //     this.http.get(jsonFile).toPromise().then((response : IAppConfig) => {
        //        ConfigService.settings = <IAppConfig>response;
        //        resolve();
        //     }).catch((response: any) => {
        //        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
        //     });
        // });
    }
}