import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DBSyncService {
    private localdb: PouchDB;
    private replication: any;
    private localdbname: string = 'gymapp-local';
    private baseUrl: string = ConfigService.settings.api.baseUrl;

    constructor(private authService: AuthService, private router: Router){}

    getDB(): Promise<PouchDB> {
        var service = this;
        
        if (service.localdb){
            return Promise.resolve(service.localdb);
        }
        
        service.localdb = new PouchDB(this.localdbname);
        var remotedb = this.baseUrl.replace('http://', ('http://' + this.authService.id() + '@'));
        var service = this;
        
        var opts = { live: true, retry: true };
        return service.localdb.replicate.from(remotedb)
            .then(r =>  {
                service.replication = service.localdb.replicate.to(remotedb, opts)
                    .on('paused', function (info) {
                        var result = info.result;
                        if (!result.ok){
                            var forbidden = result.errors.filter(e => e.error === "forbidden").length > 0;
                            if (!forbidden){
                                if (result.doc_write_failures > 0){
                                    service.handleError(false, 'Document write failure:' + JSON.stringify(result), 0)
                                }
                            }
                            else {
                                service.handleError(forbidden, forbidden ? 'forbidden' : 'paused', 0);
                            }
                        }
                    })
                    .on('denied', function (err) {
                        console.log('DENIED: ' + JSON.stringify(err));
                        service.handleError(err.error === "forbidden", err.error.message, err.status);
                    })
                    .on('error', function (err) {
                        console.log('ERROR: ' + JSON.stringify(err));
                        service.handleError(err.status === 401, err.error.message, err.status);
                    });
                return service.localdb;
            })
            .catch(function (err) {
                console.error('Error in getDB: ' + JSON.stringify(err));
                service.handleError(err.status === 401, err.error.message, err.status);
            });
    }

    private handleError(forceLogin: boolean, message: string, status: number){
        if (forceLogin){
            this.forceLogin();
            return;
        }
        console.error(`Error code: ${status}, error message is: ${message}`);
    }

    private forceLogin(){

        if (this.replication){
            console.log("cancelling sync");
            this.replication.cancel();
            console.log("setting replication to null");
            this.replication = null;    
        }
        console.log("setting localdb to null");
        this.localdb = null;
        console.log("logging out");
        this.authService.logout();
        console.log("rerouting");
        this.router.navigate(['/login']); 
    }
}