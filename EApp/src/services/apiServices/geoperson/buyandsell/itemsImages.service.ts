import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import {ItemsImagesVM} from './model.model';
@Injectable()
export class ItemsImagesService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, iid:string, ilid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("iid", iid);
        body.append("ilid", ilid);
        this.rs.SimplifyPost(this.gser.geoURL+"buyandsell/IIInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(ilid:string, iid:string, success, failed){
        var body=new FormData();
        body.append("iid", iid);
        body.append("ilid", ilid);
        this.rs.SimplifyPost(this.gser.geoURL+"buyandsell/IIRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByIID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"buyandsell/IIGetByIID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    //functions
    MToVM(object, success){
        var item=new ItemsImagesVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ItemsImagesVM[]=[];
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
}
