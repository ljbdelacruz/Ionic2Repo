import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { IS_ItemStockVM } from './model.model';
@Injectable()
export class IS_ItemStockService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(bcode:string, itemID:string, sid:string, success, failed){
        var body=new FormData();
        body.append("bcode", bcode);
        body.append("ii", itemID);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_ItemStock/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, ii:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("ii", ii);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_ItemStock/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, itemID:string, status:string, failed, success){
        var body=new FormData();
        body.append("id", id);
        body.append("itemID", itemID);
        body.append("status", status);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_ItemStock/Update", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByItemID(id:string, sid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"IS_ItemStock/GetByItemID?id="+id+"&sid="+sid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, ii:string, sid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"IS_ItemStock/GetByID?id="+id+"&ii="+ii+"&sid="+sid, this.headers,success.bind(this), failed.bind(this))
    }
    //convert object to view model here
    MToVM(object, success){
        var item=new IS_ItemStockVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
            var index=0;
            var nlist:IS_ItemStockVM[]=[];
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length-1){
                        success(nlist);
                    }
                }.bind(this))
            });
    }

}
