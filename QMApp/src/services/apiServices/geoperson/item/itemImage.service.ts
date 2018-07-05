import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import {ItemImageVM} from './model.model';
@Injectable()
export class ItemImageService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByItemID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"ItemImage/GetByItemID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    Insert(source:string, itemID:string, success, failed){
        var body=new FormData();
        body.append("source", source);
        body.append("itemID", itemID);
        this.rs.SimplifyPost(this.gser.geoURL+"ItemImage/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.SimplifyPost(this.gser.geoURL+"ItemImage/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }

    //functions
    MToVM(object, success){
        var item=new ItemImageVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ItemImageVM[]=[];
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
