// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import {GlobalDataService} from '../../singleton/global.data';
// import {CloudMessagingRoomVM, CloudMessagingReceipentVM} from '../../../model/model.model'
// import {CloudMessageReceipentService} from '../../controller/82/cloudMessageReceipent.service'
// import {CloudMessagingConversationVM} from '../../../model/model.model'
// import {CloudMessageFunction} from './cloudMessage.function'
// import {} from '../../controller/82/'
// @Injectable()
// export class CloudMessageReceipentFunction{
//     constructor(private gser:GlobalDataService, private cmcVM:CloudMessageReceipentService, private cmF:CloudMessageFunction){
//     }
//     GetByUserID(id:string, success, failed){
//         var list:CloudMessagingReceipentVM[]=[];
//         this.cmcVM.GetByUserID(id, function(resp){
//             if(resp.data.length > 0){
//                 resp.data.forEach(element => {
//                     var temp=new CloudMessagingReceipentVM();
//                     temp.set(element);
//                     this.cmF.GetByID(element.CloudMessagingConversationID, function(model){
//                         temp.Message=model;
//                         list.push(temp);
//                         if(list.length == resp.data.length){
//                             success(list);                        
//                         }
//                     }.bind(this), function(message){
//                         failed(message);
//                     }.bind(this))                
//                 });
//             }else{
//                 success([]);
//             }
//         }.bind(this), function(resp){
//             failed(resp.message);
//         }.bind(this))
//     }
//     Remove(id:string, success, failed){
//         this.cmcVM.Remove(id, function(resp){
//             success();
//         }.bind(this), function(resp){
//             failed(resp.message);
//         }.bind(this))
//     }
//     FindByID(id:string, array:CloudMessagingReceipentVM[], success){
//         success(array.findIndex(x=>x.ID == id));
//     }
// }
