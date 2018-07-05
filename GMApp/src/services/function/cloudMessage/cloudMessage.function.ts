// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import {GlobalDataService} from '../../singleton/global.data';
// import {CloudMessagingRoomVM} from '../../../model/model.model'
// import {CloudMessagingConversationVM} from '../../../model/model.model'

// @Injectable()
// export class CloudMessageFunction{
//     constructor(private gser:GlobalDataService, private cmS:CloudMessageService){
//     }
//     GetByRoom(id:string, success, failed){
//         this.cmS.GetByRoom(id, function(resp){
//             var list:CloudMessagingConversationVM[]=[];
//             resp.data.forEach(el => {
//                 var temp=new CloudMessagingConversationVM();
//                 temp.set(el);
//                 list.push(temp);
//             });
//             success(list);
//         }.bind(this), function(resp){
//             failed(resp.message);
//         }.bind(this))
//     }
//     GetByID(id:string, success, failed){
//         this.cmS.GetByID(id, function(resp){
//             var temp=new CloudMessagingConversationVM();
//             temp.set(resp.data);
//             success(temp);
//         }.bind(this), function(resp){
//             failed(resp.message);
//         }.bind(this))
//     }
//     FindByID(id:string, array:CloudMessagingConversationVM[], success){
//         success(array.findIndex(x=>x.ID==id));
//     }
//     FilterRedunduncies(compArray:CloudMessagingConversationVM[], source:CloudMessagingConversationVM[], success){
//         var index=0;
//         compArray.forEach(el=>{
//             index++;
//             this.FindByID(el.ID, source, function(lindex){
//                 if(lindex == -1){
//                     source.push(el);
//                 }
//                 if(index==compArray.length){
//                     console.log("Success Filter Redunduncies");
//                     success(source);
//                 }
//             }.bind(this))
//         })
//     }
//     FilterByRoomID(array:CloudMessagingConversationVM[], id:string, success){
//         success(array.filter(x=>x.RoomConversation==id))
//     }    
// }
