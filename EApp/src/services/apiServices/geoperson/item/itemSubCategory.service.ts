import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import {ItemSubCategoryVM} from './model.model';
@Injectable()
export class ItemCategoryService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByCategory(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"ItemSubCategory/GetByCategory?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    Insert(name:string, catID:string, success, failed){
        var body=new FormData();
        body.append("name", name);
        body.append("catID", catID);
        this.rs.SimplifyPost(this.gser.geoURL+"ItemSubCategory/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, name:string, archive:boolean, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("archived", ""+archive);
        this.rs.SimplifyPost(this.gser.geoURL+"ItemSubCategory/Update", this.headers, body, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new ItemSubCategoryVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ItemSubCategoryVM[]=[];
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
