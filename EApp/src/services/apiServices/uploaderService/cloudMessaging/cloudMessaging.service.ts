import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { CloudMessagingConversationVM } from './model.model';
@Injectable()
export class CloudMessageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(rid:string, mtype:string, text:string, api:string, cid:string, sid:string, success, failed){
        var body=new FormData();
        body.append("rid", rid);
        body.append("mtype", mtype);
        body.append("text", text);
        body.append("api", api);
        body.append("cid", cid);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.uploadURL+"CloudMessage/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, success,failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.SimplifyPost(this.gser.uploadURL+"CloudMessage/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"CloudMessage/GetByID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByRoom(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"CloudMessage/GetByRoom?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(data, success){
        var temp=new CloudMessagingConversationVM();
        temp.set(data);
        success(temp);
    }
    MsToVMs(data:any, success){
        var index=0;
        var list:CloudMessagingConversationVM[]=[];
        if(data.length>0){
            data.forEach(element => {
                var temp=new CloudMessagingConversationVM();
                temp.set(element);
                list.push(temp);
                if(index== (data.length-1)){
                    success(list);
                }
                index++;
            });
        }else{
            success(list);
        }
    }

}
