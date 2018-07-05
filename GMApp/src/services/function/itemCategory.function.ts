import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {ItemCategoryService} from '../controller/81/itemCategory.service'
import {ItemSubCategoryService} from '../controller/81/itemSubCategory.service'
//this one is for requesting data from request database
//view model
import {ItemCategoryVM, ItemSubCategoryVM} from '../../model/model.model'

@Injectable()
export class ItemCategoryFunction{
    constructor(private gser:GlobalDataService, private itemCatS:ItemCategoryService, 
    private itemSubCatS:ItemSubCategoryService){
    }
    GetAll(success, failed){
        this.itemCatS.GetAll(function(resp){
            var list:ItemCategoryVM[]=[];
            resp.data.forEach(element => {
                var temp=new ItemCategoryVM();
                temp.set(element);
                this.GetSubByCatID(element.ID, function(sub){
                    temp.SubCategories=sub;
                    list.push(temp);
                }.bind(this), function(message){
                    failed(message);
                }.bind(this))
            });
            success(list);
        }.bind(this), 
        function(resp){
            failed(resp.message);
        }.bind(this))
    }
    //itemSubCategory
    GetSubByCatID(id:string,success, failed){
        this.itemSubCatS.GetByCategory(id, 
        function(resp){
            var list:ItemSubCategoryVM[]=[];
            resp.data.forEach(element => {
                var temp=new ItemSubCategoryVM();
                temp.set(element);
                list.push(temp);
            });
            success(list);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Insert(name:string, success, failed){
        this.itemCatS.Insert(name, function(resp){
            //resp.data - id of newly inserted categories
            success(resp.data);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Update(id:string, name:string, archive:boolean, success, failed){
        this.itemCatS.Update(id, name, archive, function(){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    FindBySubCatID(id:string, array:ItemCategoryVM[], success, failed){
        var item:ItemCategoryVM=new ItemCategoryVM();
        array.forEach(el=>{
            var index=el.SubCategories.findIndex(x=>x.ID==id);
            if(index>=0){
                item.set(el);
                item.SubCategories.push(el.SubCategories[index]);
                success(item);
            }else{
                if(failed!=undefined){
                    failed();
                }
            }
        })
    }
    FindBySubCatIDIndex(id:string, array:ItemCategoryVM[], success){
        var index=array.findIndex(x=>x.SubCategories.findIndex(y=>y.ID==id) >= 0);
        success(index);
    }
    FindCatID(id:string, array:ItemCategoryVM[], success){
        var index=array.findIndex(x=>x.ID==id);
        success(index);
    }
    //subcat
    InsertSub(name:string, catID:string, success, failed){
        this.itemSubCatS.Insert(name, catID, function(resp){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    UpdateSub(id:string, name:string, archive:boolean, success, failed){
        this.itemSubCatS.Update(id, name, archive, function(resp){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    FindSubCat(id:string, array:ItemSubCategoryVM[], success){
        var index=array.findIndex(x=>x.ID==id);
        success(index);
    }
    RemoveByID(id:string, list:ItemCategoryVM[], success){
        var index=list.findIndex(x=>x.SubCategories.findIndex(y=>y.ID == id)>=0);
        list.splice(index, 1);
        success(list);
    }

}
