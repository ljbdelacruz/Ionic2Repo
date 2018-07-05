import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {RequestService} from '../../../request.service';
import {hubConnection} from 'signalr-no-jquery'
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import {NotificationManagerVM} from './model.model'
@Injectable()
export class NotificationManagerService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(api:string, cid:string, title:string, message:string, success, failed){
        var body=new FormData();
        body.append("api", api);
        body.append("cid", cid);
        body.append("title", title);
        body.append("message", message);
        this.rs.SimplifyPost(this.gser.uploadURL+"NotificationManager/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertReceipent(nid:string, rid:string, api:string, success, failed){
        var body=new FormData();
        body.append("nid", nid);
        body.append("rid", rid);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.uploadURL+"NotificationManager/InsertReceipent", this.headers, body, success.bind(this), failed.bind(this))
    }
    NotificationReceived(id:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.uploadURL+"NotificationManager/NotificationReceived", this.headers, body, success.bind(this), failed.bind(this))
    }
    CheckOwnerNotification(api:string, cid:string, uid:string, success, failed){
        var body=new FormData();
        body.append("api", api);
        body.append("cid", cid);
        body.append("uid", uid);
        this.rs.SimplifyPost(this.gser.uploadURL+"NotificationManager/CheckOwnerNotification", this.headers, body, success.bind(this), failed.bind(this))
    }
    MToVM(data, success){
        var temp=new NotificationManagerVM();
        temp.set(data);
        success(temp);
    }
    MsToVMs(data:any, success){
        var index=0;
        var list:NotificationManagerVM[]=[];
        if(data.length>0){
            data.forEach(element => {
                var temp=new NotificationManagerVM();
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
    Splice(array:NotificationManagerVM[], item:NotificationManagerVM, success){
        var index=array.findIndex(x=>x.ID==item.ID);
        array.splice(index, 1);
        success(array);
    }
    //signalR
    SendNotificationSignal(success, failed, connSuccess){
        const conn=hubConnection(this.gser.uploadURL);
        const testhub=conn.createHubProxy("notificationManagerHub");        
        testhub.on("Sendnotify", function(id, api, ownerID, title, message){
            if(this.gser.applicationID == api && this.gser.userLoginInfo.ID == ownerID){
                this.gSer.CreateLocalNotification(id, message, title, this.gser.uploadURL+"UPLOADS/GEO/Settings/ni.jpg");
                //mark notification as received
                this.NotificationReceived(id, api,function(){}.bind(this), function(){}.bind(this))
                var temp=new NotificationManagerVM();
                temp.ID=id;
                temp.Message=message;
                temp.Title=title;
                success(temp);
            }
        }.bind(this))
        conn.start({jsonp:true}).done(function(){
            console.log("Connection Success")
            console.log(conn.id);
            connSuccess();
        }).fail(function(){
            console.log(conn);
            console.log("Connection Failed");
        });
    }

}
