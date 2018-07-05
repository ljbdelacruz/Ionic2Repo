import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
//singleton
import {GlobalDataService} from '../../singleton/global.data';
import { MessagingRoomVM, MessagingConversationVM } from './model.model';
import {MessagingConversationService} from './messagingConversation.service'
import {MessagingRoomParticipantService} from './messagingRoomParticipants.service'
@Injectable()
export class MessagingRoomService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService, private mcS:MessagingConversationService, private mrpS:MessagingRoomParticipantService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(name:string, api:string, success, failed){
        var body=new FormData();
        body.append("name", name);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"MessagingRoom/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                //id
                success(resp.json().data);
            }else{
                //message
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    Remove(id:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        this.rs.PostParam(this.gser.uploadURL+"MessagingRoom/Remove", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByID(id:string, api:string, success, failed){
        console.log("Getting By ID");
        this.rs.Get(this.gser.uploadURL+"MessagingRoom/GetByID?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                console.log("Error");
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByIDF(id:string, api:string, success, failed){
        this.GetByID(id, api, function(resp){
            var temp=new MessagingRoomVM();
            temp.set(resp.data);
            success(temp);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }

    CreateNewRoomForParticipants(roomName:string,api:string, text:string, messageType:string, inquirerID:string, adOwnerID:string,  success, failed){
        this.Insert(roomName, api, function(rid){
            //adding the 
            this.mrpS.Insert(adOwnerID, rid, api, function(){
                this.mcS.Insert(text, messageType, inquirerID, rid, api, function(){
                    var temp=new MessagingRoomVM();
                    temp.set1(rid, roomName);
                    success(temp);
                }.bind(this), function(){}.bind(this))    
            }.bind(this), function(){}.bind(this))
            //adding the inquirer as participant of the room
            this.mrpS.Insert(inquirerID, rid, api, function(part){}.bind(this), function(part){failed(part.message)}.bind(this))
        }.bind(this), function(){}.bind(this))
    }
    FindByID(array:MessagingRoomVM[], id:string, success){
        success(array.findIndex(x=>x.ID==id));
    }
    Splice(array:MessagingRoomVM[], index, success){
        array.splice(index, 1);
        success(array);
    }
    SpliceByID(array:MessagingRoomVM[], id:string, success){
        this.FindByID(array, id, function(index){
            this.Splice(array, index, success.bind(this))
        }.bind(this))
    }





}
