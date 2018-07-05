import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { CloudMessagingRoomVM } from './model.model';

@Injectable()
export class CloudRoomService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"CloudRoom/GetByID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }    
    MToVM(data, success){
        var temp=new CloudMessagingRoomVM();
        temp.set(data);
        success(temp);
    }
    MsToVMs(data:any, success){
        var index=0;
        var list:CloudMessagingRoomVM[]=[];
        if(data.length>0){
            data.forEach(element => {
                var temp=new CloudMessagingRoomVM();
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
}
