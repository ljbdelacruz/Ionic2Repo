import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
import {GeneralService} from '../../general.service'
//singleton
import {GlobalDataService} from '../../singleton/global.data';
import {hubConnection} from 'signalr-no-jquery'
import { NotificationManagerVM } from './model.model';
import {StorageFunction} from '../../function/storage.function'
@Injectable()
export class CloudNotificationService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService, private gSer:GeneralService, private storageF:StorageFunction){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(api:string, cid:string, title:string, message:string, success, failed){
        var body=new FormData();
        body.append("api", api);
        body.append("cid", cid);
        body.append("title", title);
        body.append("message", message);
        this.rs.PostParam(this.gser.uploadURL+"NotificationManager/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    InsertReceipent(nid:string, rid:string, api:string, success, failed){
        var body=new FormData();
        body.append("nid", nid);
        body.append("rid", rid);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"NotificationManager/InsertReceipent", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    
    NotificationReceived(id:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"NotificationManager/NotificationReceived", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    CheckOwnerNotification(api:string, cid:string, uid:string, success, failed){
        console.log("Checking User Owner Notification");
        console.log(uid);
        var body=new FormData();
        body.append("api", api);
        body.append("cid", cid);
        body.append("uid", uid);
        this.rs.PostParam(this.gser.uploadURL+"NotificationManager/CheckOwnerNotification", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json())
            }
        }, err=>{
            failed({message:''});
        })
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
                temp.set1(id, title, message);
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
    StoreLocalNotifications(item, array:any[]){
        var list:any[]=[];
        console.log(array.length);
        this.storageF.Stack(array, item, function(nlist){
            list=nlist;
            this.StoreLocalNotification(list);
        }.bind(this))
    }
    StoreLocalNotification(items){
        console.log("Storing items")
        console.log(items);
        this.storageF.StoreToLocal(this.gser.userLoginInfo.ID+"_notifications", items);
    }
    GetNotifications(success, failed){
        this.storageF.FetchFromLocal(this.gser.userLoginInfo.ID+"_notifications", function(item){

            success(item!=null?item:[]);
        }.bind(this), function(){}.bind(this))
    }
    StoreLocalNotificationCount(count){
        this.storageF.StoreToLocal(this.gser.userLoginInfo.ID+"_notificationcount", count!=undefined?count:0);
    }
    GetLocalNotificationCount(success, failed){
        this.storageF.FetchFromLocal(this.gser.userLoginInfo.ID+"_notificationcount", function(count){
            success(count!=null?count:0);
        }.bind(this), function(){})
    }
    Splice(array:NotificationManagerVM[], item:NotificationManagerVM, success){
        var index=array.findIndex(x=>x.ID==item.ID);
        array.splice(index, 1);
        success(array);
    }


}
