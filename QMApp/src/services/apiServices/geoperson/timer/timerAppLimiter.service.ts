import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { TimerAppLimitersVM } from './model.model';
@Injectable()
export class TimerAppLimiterService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, srid:string, oid:string, aid:string, sec:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("srid", srid);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("sec", sec);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TALInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TALRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, srid:string, oid:string, aid:string, sec:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("srid", srid);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("sec", sec);
        this.rs.SimplifyPost(this.gser.geoURL+"TimerApp/TALUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"TimerApp/TALGetByID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByOID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"TimerApp/TALGetByOID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    



    //convert object to view model here
    MToVM(object, success){
            var item=new TimerAppLimitersVM();
            item.set(object);
            success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:TimerAppLimitersVM[]=[];
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
