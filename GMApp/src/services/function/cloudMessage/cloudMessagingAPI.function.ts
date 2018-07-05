// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import 'rxjs/add/operator/catch';
// import {GlobalDataService} from '../../singleton/global.data';
// import {CloudMessagingRoomVM, CloudMessagingReceipentVM, CloudRoomParticipantsVM, CloudMessagingConversationVM} from '../../../model/model.model'
// import {CloudRoomFunction} from './cloudRoom.function'
// import {CloudRoomParticipantsFunction} from './cloudRoomParticipants.function';
// import {CloudMessageReceipentFunction} from './cloudMessageReceipent.function'
// @Injectable()
// export class CloudMessagingAPI{
//     constructor(private gser:GlobalDataService, private crF:CloudRoomFunction, private crpF:CloudRoomParticipantsFunction,
//     private cmrF:CloudMessageReceipentFunction, private storage:Storage){
//     }
//     GetUserRooms(id:string, success, failed){
//         var vmList:CloudMessagingRoomVM[]=[];
//         this.crpF.GetByUserID(id, function(list){
//             if(list.length>0){
//                 list.forEach(el => {
//                     var temp=new CloudMessagingRoomVM();
//                     this.crF.GetByID(el.RoomID, function(model){
//                       vmList.push(model);
//                       if(vmList.length == list.length){
//                           success(vmList);
//                       }
//                     }.bind(this), function(message){
//                         failed(message);
//                     }.bind(this))
//                 });
//             }else{
//                 success(vmList);
//             }
//         }.bind(this), function(message){
//             failed(message);
//         }.bind(this))
//     }
//     //userID
//     GetNewMessages(id:string,success, failed){
//         console.log("Getting New Messages");
//         var messages:CloudMessagingConversationVM[]=[];
//         this.cmrF.GetByUserID(id, function(list){
//             if(list.length>0){
//                 list.forEach(el => {
//                     messages.push(el.Message);
//                     if(messages.length == list.length){
//                         //returns list of receipent and message
//                         success(messages, list);
//                     }
//                 });
//             }else{
//                 success(messages, list);
//             }
//         }.bind(this), function(message){
//             failed(message);
//         }.bind(this))
//     }
//     ConfirmReceiveMessage(array:CloudRoomParticipantsVM[], success, failed){
//         array.forEach(el=>{
//             this.cmrF.Remove(el.ID, function(){
//                 success();
//             }.bind(this), function(){
//                 failed();
//             }.bind(this))
//         })
//     }
//     GetLocalStorageMessages(success, failed){
//         this.storage.get("messages").then(val=>{
//             if(val==null || val.length == 0){
//               success([]);
//             }else{
//               success(val);
//             }
//           })
//     }
//     StoreLocalMessage(message:CloudMessagingConversationVM[]){
//         this.storage.set("messages",message);
//     }
//     StoreLocalRooms(rooms:CloudMessagingRoomVM[]){
//         this.storage.set("rooms", rooms);
//     }
// }
