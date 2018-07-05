import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
//singleton
import {GlobalDataService} from '../../singleton/global.data';
import {MessagingRoomParticipantsVM, MessagingConversationVM} from './model.model'
import { repeat } from 'rxjs/operator/repeat';
@Injectable()
export class MessagingRoomParticipantService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, rid:string, api:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("rid", rid);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"MessagingRoomParticipant/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.uploadURL+"MessagingRoomParticipant/Remove", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByRoomID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"MessagingRoomParticipant/GetByRoomID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        })
    }
    GetByParticipantID(id:string, api:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"MessagingRoomParticipant/GetByParticipantID?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetBy
    GetByParticipantIDF(id:string, api:string, success, failed){
        this.GetByParticipantID(id, api, function(resp){
            var list:MessagingRoomParticipantsVM[]=[];
            if(resp.data.length>0){
                resp.data.forEach(element => {
                    var temp=new MessagingRoomParticipantsVM();
                    temp.set(element);
                    list.push(temp);
                    if(list.length==resp.data.length){
                        success(list);
                    }
                });
            }else{
                success(list);
            }
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    GetByRoomIDF(id:string, success, failed){
        this.GetByRoomID(id, function(resp){
            console.log(resp);
            var list:MessagingRoomParticipantsVM[]=[];
            if(resp.data.length> 0){
                resp.data.forEach(el => {
                    var temp=new MessagingRoomParticipantsVM();
                    temp.set(el);
                    list.push(temp);
                    if(list.length == resp.data.length){
                        success(list);
                    }
                });
            }else{
                success([]);
            }
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    FindByRoomID(array:MessagingRoomParticipantsVM[], roomID:string, success){
        success(array.findIndex(x=>x.RoomID == roomID));
    }
    Splice(array:MessagingRoomParticipantsVM[], index, success){
        array.splice(index, 1);
        success(array);
    }

}
