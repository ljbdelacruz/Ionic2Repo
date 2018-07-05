import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { StatusTypeReferenceVM } from './model.model';
@Injectable()
export class StoreService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(name:string, desc:string, success, failed){
        var body=new FormData();
        body.append("name", name);
        body.append("desc", desc);
        this.rs.SimplifyPost(this.gser.geoURL+"StatusTypeReference/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"StatusTypeReference/GetByID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    //convert object to view model here
    MToVM(object, success){
            var item=new StatusTypeReferenceVM();
            item.set(object);
            success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:StatusTypeReferenceVM[]=[];
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
