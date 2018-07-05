import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { MessagingConversationVM } from './model.model';
@Injectable()
export class MessagingConversationService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(text:string, mtype:string, sid:string, rid:string, api:string, success, failed){
        var body=new FormData();
        body.append("text", text)
        body.append("mtype", mtype)
        body.append("sid", sid)
        body.append("rid", rid)
        body.append("api", api)
        this.rs.SimplifyPost(this.gser.uploadURL+"MessagingConversation/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.SimplifyPost(this.gser.uploadURL+"MessagingConversation/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"MessagingConversation/GetByID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByRoomID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"MessagingConversation/GetByRoomID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(data, success){
        var temp=new MessagingConversationVM();
        temp.set(data);
        success(temp);
    }
    MsToVMs(data:any, success){
        var index=0;
        var list:MessagingConversationVM[]=[];
        if(data.length>0){
            data.forEach(element => {
                var temp=new MessagingConversationVM();
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
