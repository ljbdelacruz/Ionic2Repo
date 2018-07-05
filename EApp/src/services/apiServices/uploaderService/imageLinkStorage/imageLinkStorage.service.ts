import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
import { Headers } from '@angular/http';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { ImageLinkStorageVM } from './model.model';
@Injectable()
export class ImageLinkStorageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string,api:string, oid:string, source:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        body.append("oid", oid);
        body.append("source", source);
        this.rs.SimplifyPost(this.gser.uploadURL+"ImageLinkStorage/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, api:string, oid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        body.append("oid", oid);
        this.rs.SimplifyPost(this.gser.uploadURL+"ImageLinkStorage/Remove", this.headers, body, success.bind(this), failed.bind(this));
    }
    GetByOIDAPI(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"ImageLinkStorage/GetByOIDAPI?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.uploadURL+"ImageLinkStorage/GetByID?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new ImageLinkStorageVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ImageLinkStorageVM[]=[];
        if(list.length > 0){
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
    GetImage(id:string, api:string, success, failed){
        this.GetByID(id, api, function(data){
          this.MToVM(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
}
