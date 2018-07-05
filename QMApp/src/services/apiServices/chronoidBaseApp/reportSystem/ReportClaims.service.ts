import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model


@Injectable()
export class ReportClaimsService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, suid:string, reason:string, api:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("suid", suid);
        body.append("reason", reason);
        body.append("aid", api);
        this.rs.SimplifyPost(this.gser.url+"ReportClaims/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByList(appID:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"ReportClaims/GetByList?id="+appID, this.headers, success.bind(this), failed.bind(this))
    }
}
