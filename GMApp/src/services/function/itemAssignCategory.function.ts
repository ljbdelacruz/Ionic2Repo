import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {ItemCategoryFunction} from './itemCategory.function'
import {ItemAssignCategoryService} from '../controller/81/itemAssignCategory.service'
//this one is for requesting data from request database
//view model
import { ItemCategoryVM } from '../../model/model.model'

@Injectable()
export class ItemAssignCategoryFunction{
    constructor(private gser:GlobalDataService, private itemACS:ItemAssignCategoryService, private itemCF:ItemCategoryFunction){
    }
    GetByItemID(id:string, success, failed){
        this.itemACS.GetByItemID(id, function(resp){
            var list:ItemCategoryVM[]=[];
            resp.data.forEach(element => {
                this.itemCF.FindBySubCatID(element.CategoryID, this.gser.categories, function(obj){
                    list.push(obj);
                }.bind(this))                
            });
            success(list);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Update(itemID:string, subCatID:string, success, failed){
        this.itemACS.Update(itemID, subCatID, function(){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
}
