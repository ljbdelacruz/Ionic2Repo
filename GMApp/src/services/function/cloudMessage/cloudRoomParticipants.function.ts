// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import {GlobalDataService} from '../../singleton/global.data';
// import {CloudRoomParticipantsVM, CloudMessagingRoomVM} from '../../../model/model.model'
// import {CloudRoomParticipantsService} from '../../controller/82/cloudRoomParticipants.service'
// import {CloudRoomFunction} from './cloudRoom.function'
// import {CloudMessageFunction} from './cloudMessage.function'
// @Injectable()
// export class CloudRoomParticipantsFunction{
//     constructor(private gser:GlobalDataService, private crpS:CloudRoomParticipantsService){
//     }
//     GetByUserID(id:string, success, failed){
//         this.crpS.GetByUserID(id, function(resp){
//             var list:CloudRoomParticipantsVM[]=[];
//             resp.data.forEach(el => {
//                 var temp=new CloudRoomParticipantsVM();
//                 temp.set(el);
//                 list.push(temp);
//             });
//             success(list);
//         }.bind(this), function(resp){
//             failed(resp.message);
//         }.bind(this))
//     }
//     Remove(id:string, success, failed){
//         this.crpS.Remove(id, function(resp){
//             success();
//         }.bind(this), function(resp){
//             failed(resp.message);
//         }.bind(this))
//     }
//     FindByID(id:string, array:CloudRoomParticipantsVM[], success){
//         success(array.findIndex(x=>x.ID == id));
//     }


// }
