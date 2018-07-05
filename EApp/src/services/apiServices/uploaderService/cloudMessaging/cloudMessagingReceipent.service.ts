import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
import { Headers } from '@angular/http';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { CloudMessageReceipentVM } from './model.model';
@Injectable()
export class CloudMessageReceipentService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, cmcID:string, rid:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("cmcID", cmcID);
        body.append("rid", rid);
        this.rs.SimplifyPost(this.gser.uploadURL+"CloudMessageReceipent/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.SimplifyPost(this.gser.uploadURL+"CloudMessageReceipent/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByUserID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"CloudMessageReceipent/GetByUserID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    
    MToVM(data, success){
        var temp=new CloudMessageReceipentVM();
        temp.set(data);
        success(temp);
    }
    MsToVMs(data:any, success){
        var index=0;
        var list:CloudMessageReceipentVM[]=[];
        if(data.length>0){
            data.forEach(element => {
                var temp=new CloudMessageReceipentVM();
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
