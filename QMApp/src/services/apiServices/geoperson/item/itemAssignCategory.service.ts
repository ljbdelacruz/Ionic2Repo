import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import {ItemAssignCategoryVM} from './model.model';
@Injectable()
export class ItemAssignCategoryService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByItemID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"ItemAssignCategory/GetByItemID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    Insert(itemId:string, subCat:string, success, failed){
        var body=new FormData();
        body.append("iid", itemId);
        body.append("subCat", subCat);
        this.rs.SimplifyPost(this.gser.geoURL+"ItemAssignCategory/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(itemID:string, subCatID:string, success, failed){
        var body=new FormData();
        body.append("id", itemID);
        body.append("subCat", subCatID);
        this.rs.SimplifyPost(this.gser.geoURL+"ItemAssignCategory/Update", this.headers, body, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new ItemAssignCategoryVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ItemAssignCategoryVM[]=[];
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
