import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {Storage} from '@ionic/storage'
import {CloudMessagingConversationVM, CloudMessagingReceipentVM, CloudRoomParticipantsVM, 
CloudMessagingRoomVM, TaskFailedMessage} from './model.model'
import {GlobalDataService} from '../../singleton/global.data'
@Injectable()
export class CloudMessagingAPIFunction{
    constructor(private cmrF:CloudMessageReceipentFunction, private crpF:CloudRoomParticipantsFunction, private crF:CloudRoomFunction,
    private cmF:CloudMessageFunction, private cmfF:CloudMessageFailedFunction){
    }
    CheckNewMessages(uid:string, success, failed){
        var messages:CloudMessagingConversationVM[]=[];
        //checks the receipent table if it has new messages for me

        this.cmrF.GetByUserID(uid, function(list:CloudMessagingReceipentVM[]){
            list.forEach(el=>{
                this.cmF.GetByID(el.CloudMessagingConversationID, function(message:CloudMessagingConversationVM){
                    messages.push(message);
                    if(list.length == messages.length){

                        success(messages);
                    }
                }.bind(this), function(message){
                    failed(message);
                }.bind(this))
            })
            
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    GetMyRooms(uid:string, success, failed){
        var rooms:CloudMessagingRoomVM[]=[];
        this.crpF.GetByUserID(uid, function(list:CloudRoomParticipantsVM[]){
            list.forEach(el=>{
                this.crF.GetByID(el.RoomID, function(model:CloudMessagingRoomVM){
                    rooms.push(model);
                    if(this.rooms.length==list.length){
                        success(list);
                    }
                }.bind(this), function(message){
                    failed(message);
                }.bind(this))
            })
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    //filter the sender of the message in the participants
    SendMessages(message:CloudMessagingConversationVM, participants:CloudRoomParticipantsVM[], success, failed){
        //message- insert, insert messageReceipent of this message
        this.cmF.Insert(message, function(id){
            //use the id of the message to insert the receipent
            message.ID=id;            
            participants.forEach(el=>{
                this.SendMessageReceipent(message, el, function(){
                }.bind(this), function(message){
                    this.cmfF.SetFailedMessages(el, message);
                    failed(message);
                }.bind(this));
            })
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    SendMessageReceipent(message:CloudMessagingConversationVM, participants:CloudRoomParticipantsVM, success, failed){
        var temp:CloudMessagingReceipentVM=new CloudMessagingReceipentVM();
        temp.set1("", participants.UserID, message.ID, participants.RoomID);
        this.cmrF.Insert(temp, function(){
            success();
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    //id of the receipent id
    ConfirmMessageReceipentReceived(id:string, success, failed){
        //confirms that the message receipent of this message has received the message
        //and will now remove the receipent id
        this.cmrF.Remove(id, function(){
            success();
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }   
    //resending failed sent messages to receipent
    ResendReceipent(success, failed){
        this.cmfF.GetMessageFailed(function(list:TaskFailedMessage[]){
            list.forEach(el=>{
                this.SendMessageReceipent(el.message, el.participant, function(){
                                        
                }.bind(this), function(message){
                    failed(message);
                }.bind(this))
            })
            success();
        }.bind(this))
    }
}
//cloud message
import {CloudMessageService} from './cloudMessaging.service'
@Injectable()
export class CloudMessageFunction{
    constructor(private cmS:CloudMessageService, private gData:GlobalDataService){
    }
    GetByRoom(id:string, success, failed){
        this.cmS.GetByRoom(id, function(resp){
            var list:CloudMessagingConversationVM[]=[];
            resp.data.forEach(el => {
                var temp=new CloudMessagingConversationVM();
                temp.set(el);
                list.push(temp);
            });
            success(list);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    GetByID(id:string, success, failed){
        this.cmS.GetByID(id, function(resp){
            var temp=new CloudMessagingConversationVM();
            temp.set(resp.data);
            success(temp);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    FindByID(id:string, array:CloudMessagingConversationVM[], success){
        success(array.findIndex(x=>x.ID==id));
    }
    FilterByRoomID(array:CloudMessagingConversationVM[], id:string, success){
        success(array.filter(x=>x.RoomConversation==id))
    }    
    Insert(message:CloudMessagingConversationVM, success, failed){
        this.cmS.Insert(message.RoomConversation, message.MessageType, message.Text, this.gData.api, this.gData.applicationID, 
        message.SenderID, function(resp){
            //resp.data=id of newly inserted message
            success(resp.data);
        }.bind(this), function(resp){}.bind(this))
    }
    //this kind of adding object will put item to the top
    Stack(array:CloudMessagingConversationVM[], item:CloudMessagingConversationVM, success){
        var list:CloudMessagingConversationVM[]=[]
        list.push(item);
        array.forEach(el=>{
            list.push(el);
            if(list.length==array.length+1){
                success(list);
            }
        })
    }
}
//cloud message receipent
import {CloudMessageReceipentService} from './cloudMessageReceipent.service'
@Injectable()
export class CloudMessageReceipentFunction{
    constructor(private cmcVM:CloudMessageReceipentService){
    }
    GetByUserID(id:string, success, failed){
        var list:CloudMessagingReceipentVM[]=[];
        this.cmcVM.GetByUserID(id, function(resp){
            if(resp.data.length > 0){
                resp.data.forEach(element => {
                    var temp=new CloudMessagingReceipentVM();
                    temp.set(element);
                    list.push(temp);
                    if(list.length==resp.data.length){
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
    Remove(id:string, success, failed){
        this.cmcVM.Remove(id, function(resp){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    FindByID(id:string, array:CloudMessagingReceipentVM[], success){
        success(array.findIndex(x=>x.ID == id));
    }
    Insert(model:CloudMessagingReceipentVM, success, failed){
        this.cmcVM.Insert(model.UserID, model.CloudMessagingConversationID, model.RoomID, function(resp){
            //id of that inserted message receipent
            success(resp.data);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
}

//cloud participants
import {CloudRoomParticipantsService} from './cloudRoomParticipants.service'
@Injectable()
export class CloudRoomParticipantsFunction{
    constructor( private crpS:CloudRoomParticipantsService){
    }
    GetByUserID(id:string, success, failed){
        this.crpS.GetByUserID(id, function(resp){
            var list:CloudRoomParticipantsVM[]=[];
            resp.data.forEach(el => {
                var temp=new CloudRoomParticipantsVM();
                temp.set(el);
                list.push(temp);
            });
            success(list);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Remove(id:string, success, failed){
        this.crpS.Remove(id, function(resp){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    FindByID(id:string, array:CloudRoomParticipantsVM[], success){
        success(array.findIndex(x=>x.ID == id));
    }
}
//cloud room
import {CloudRoomService} from './cloudRoom.service'
@Injectable()
export class CloudRoomFunction{
    constructor(private crS:CloudRoomService){
    }
    GetByID(id:string, success, failed){
        this.crS.GetByID(id, function(resp){
            var temp=new CloudMessagingRoomVM();
            temp.set(resp.data);
            success(temp);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
}
@Injectable()
export class CloudMessageFailedFunction{
    constructor(private storage:Storage){
    }
    GetMessageFailed(success){
        this.storage.get("fmessages").then(value=>{
            if(value==null || value == undefined){
                success([]);
            }else{
                success(value);
            }
        })
    }
    SetFailedMessages(participants:CloudRoomParticipantsVM, message:CloudMessagingConversationVM){
        var temp=new TaskFailedMessage();
        temp.set(participants, message);
        this.GetMessageFailed(function(list){
            this.Stack(list, temp, function(nlist){
                this.SetFailed(nlist);
            }.bind(this))
        }.bind(this))
    }
    SetFailed(tasks:TaskFailedMessage[]){
        this.storage.set("fmessages", tasks);
    }
    Stack(array:TaskFailedMessage[], item:TaskFailedMessage, success){
        var list:TaskFailedMessage[]=[]
        list.push(item);
        array.forEach(el=>{
            list.push(el);
            if(list.length==array.length+1){
                success(list);
            }
        })
    }
}


