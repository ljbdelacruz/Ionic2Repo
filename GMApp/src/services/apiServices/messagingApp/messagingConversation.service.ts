import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
import {hubConnection} from 'signalr-no-jquery'
//singleton
import {GlobalDataService} from '../../singleton/global.data';
import {MessagingConversationVM} from './model.model'
@Injectable()
export class MessagingConversationService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(text:string, mtype:string, sid:string, rid:string, api:string, success, failed){
        var body=new FormData();
        body.append("text", text);
        body.append("mtype", mtype);
        body.append("sid", sid);
        body.append("rid", rid);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"MessagingConversation/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        })
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.uploadURL+"MessagingConversation/Remove", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"MessagingConversation/GetByID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                var temp=new MessagingConversationVM();
                temp.set(resp.json().data);
                success(temp);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByRoomID(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.uploadURL+"MessagingConversation/GetByRoomID", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByRoomIDF(id:string, success, failed){
        this.GetByRoomID(id, function(resp){
            var list:MessagingConversationVM[]=[];
            resp.data.forEach(x=>{
                var temp=new MessagingConversationVM();
                temp.set(x);
                list.push(temp);
                if(resp.data.length == list.length){
                    success(list);
                }
            })
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    JoinArray(array1:MessagingConversationVM[], array2:MessagingConversationVM[], success){
        var count=0;
        array1.forEach(x=>{
            var index=array2.findIndex(y=>y.ID == x.ID);
            if(index==-1){
                this.Stack(array2, x, function(list){
                    array2=list;
                }.bind(this))
            }
            count++;
            if(count==array1.length){
                success(array2);
            }
        })
    }
    Stack(array:MessagingConversationVM[], item:MessagingConversationVM, success){
        var list=[];
        list.push(item);
        array.forEach(x=>{
            list.push(x);
            if(list.length==(array.length+1)){
                success(list);
            }
        })
    }
    ListenNewMessageFromThisRoom(rid:string, success, leaveRoomSuccess, failed){
        const conn=hubConnection(this.gser.uploadURL);
        const testhub=conn.createHubProxy("messagingAppHub");
        testhub.on("Sendnotify", function(id, api, roomID){
            if(this.gser.uploadersAPI == api && roomID==rid){
                success(id, api, roomID);
            }
        }.bind(this))
        testhub.on("Leaveroom", function(roomID, userID, api){
            if(this.gser.uploadersAPI == api && roomID==rid){
                leaveRoomSuccess(roomID, userID, api);
            }
        }.bind(this))
        conn.start({jsonp:true}).done(function(){
            // console.log(conn.id);
        }).fail(function(){
            console.log(conn);
            failed("Connection Failed")
        });
    }

}
