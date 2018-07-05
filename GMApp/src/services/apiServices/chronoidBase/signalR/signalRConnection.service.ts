import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../controller/request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
@Injectable()
export class SignalRCpnnectionService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByUIDAppIDHubName(aid:string, uid:string, hub:string, success, failed){
        this.rs.Get(this.gser.url+"SignalRConnection/GetByUIDAppIDHubName?aid="+aid+"&uid="+uid+"&hub="+hub, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed("");
        })
    }

    Insert(appID:string, uid:string, sid:string, hubName:string, success, failed){
        var body=new FormData();
        body.append("AppID", appID);
        body.append("UID", uid);
        body.append("SID", sid);
        body.append("hub", hubName);
        this.rs.PostParam(this.gser.url+"SignalRConnection/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed("");
        })
    }
    Update(aid:string, uid:string, hub:string, sid:string, success, failed){
        var body=new FormData();
        body.append("aid", aid);
        body.append("uid", uid);
        body.append("hub", hub);
        body.append("sid", sid);
        this.rs.PostParam(this.gser.url+"SignalRConnection/Update", this.headers, body).subscribe(resp=>{
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
