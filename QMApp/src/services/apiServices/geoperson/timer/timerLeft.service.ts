import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { TimerLeftVM } from './model.model';
@Injectable()
export class TimerAppLimiterService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, oid:string, taid:string, aid:string, ts:string, te:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("taid", taid);
        body.append("aid", aid);
        body.append("ts", ts);
        body.append("te", te);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TLInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, taid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("taid", taid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TLRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByTAIDOID(id:string, oid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"TimerApp/TLGetByTAIDOID?id="+id+"&oid="+oid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    //convert object to view model here
    MToVM(object, success){
            var item=new TimerLeftVM();
            item.set(object);
            success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:TimerLeftVM[]=[];
        if(list.length >0 ){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length-1){
                        success(nlist);
                    }
                }.bind(this))
            });
        }else{
            success(nlist);
        }
    }

    
}
