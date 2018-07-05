import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../controller/request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
@Injectable()
export class ReportClaimsService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, suid:string, reason:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("suid", suid);
        body.append("reason", reason);
        body.append("aid", this.gser.applicationID);
        this.rs.PostParam(this.gser.url+"ReportClaims/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed("");
        })
    }



}
