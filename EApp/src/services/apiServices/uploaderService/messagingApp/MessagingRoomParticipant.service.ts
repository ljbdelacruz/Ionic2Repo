import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { MessagingRoomParticipantsVM } from './model.model';
@Injectable()
export class MessagingRoomParticipantService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, rid:string, api:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("rid", rid);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"MessagingRoomParticipant/Insert", this.headers, body).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.uploadURL+"MessagingRoomParticipant/Remove", this.headers, body).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    GetByRoomID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"MessagingRoomParticipant/GetByRoomID?id="+id, this.headers).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    GetByParticipantID(id:string, api:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"MessagingRoomParticipant/GetByParticipantID?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    ReturnUpdate(resp, success, failed){
        if(resp.json().success){
            success(resp.json().data);
        }else{
            failed(resp.json().message)
        }
    }
    MToVM(data, success){
        var temp=new MessagingRoomParticipantsVM();
        temp.set(data);
        success(temp);
    }
    MsToVMs(data:any, success){
        var index=0;
        var list:MessagingRoomParticipantsVM[]=[];
        if(data.length>0){
            data.forEach(element => {
                var temp=new MessagingRoomParticipantsVM();
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
