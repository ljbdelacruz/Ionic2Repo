import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { IS_ItemVM } from './model.model';
@Injectable()
export class IS_ItemService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(title:string, desc:string, api:string, ic:string, isCount:boolean, spi:string, success, failed){
        var body=new FormData();
        body.append("title", title);
        body.append("description", desc);
        body.append("api", api);
        body.append("ic", ic);
        body.append("isCount", ""+isCount);
        body.append("spi", ""+spi);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_Item/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_Item/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, title:string, desc:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("title", title);
        body.append("desc", desc);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_Item/Update", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByAPI(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"IS_Item/GetByAPI?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByItemCategory(api:string, cat:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"IS_Item/GetByItemCategory?api="+api+"&category="+cat, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"IS_Item/GetByID?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    //convert object to view model here
    MToVM(object, success){
        var item=new IS_ItemVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:IS_ItemVM[]=[];
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
