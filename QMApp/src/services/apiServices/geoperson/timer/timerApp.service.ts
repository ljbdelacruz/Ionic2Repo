import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { TimerAppVM } from './model.model';
@Injectable()
export class TimerAppService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, oid:string, aid:string, et:string, dt:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("et", et);
        body.append("dt", dt);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TAInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TARemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, oid:string, aid:string, et:string, dt:string, success, failed){
        var body=new FormData();
        body.append("id", id)
        body.append("oid", oid)
        body.append("aid", aid)
        body.append("et", et)
        body.append("dt", dt)
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TAUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByOID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"TimerApp/TAGetByOID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    //convert object to view model here
    MToVM(object, success){
            var item=new TimerAppVM();
            item.set(object);
            success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:TimerAppVM[]=[];
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
