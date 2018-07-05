import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
@Injectable()
export class CRSignalRConnectionService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByUIDAppIDHubName(aid:string, uid:string, hub:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"SignalRConnection/GetByUIDAppIDHubName?aid="+aid+"&uid="+uid+"&hub="+hub, this.headers, success.bind(this), failed.bind(this))
    }
    Insert(appID:string, uid:string, sid:string, hubName:string, success, failed){
        var body=new FormData();
        body.append("AppID", appID);
        body.append("UID", uid);
        body.append("SID", sid);
        body.append("hub", hubName);
        this.rs.SimplifyPost(this.gser.url+"SignalRConnection/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(aid:string, uid:string, hub:string, sid:string, success, failed){
        var body=new FormData();
        body.append("aid", aid);
        body.append("uid", uid);
        body.append("hub", hub);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.url+"SignalRConnection/Update", this.headers, body, success.bind(this), failed.bind(this))
    }

    



}
