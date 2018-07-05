import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {ItemService} from '../controller/81/item.service'
import {ItemImageService} from '../controller/81/itemImage.service'
//this one is for requesting data from request database
//view model
import {ItemVM, ItemImageVM} from '../../model/model.model'
import {ItemAssignCategoryFunction} from './itemAssignCategory.function'

@Injectable()
export class ItemFunction{
    constructor(private gser:GlobalDataService, private itemS:ItemService, private itemImageS:ItemImageService, private itemACF:ItemAssignCategoryFunction){
    }
    GetIDStatus(id:string, success, failed){
        this.itemS.GetIDStatus(id, function(resp){
            //boolean true or false value
            success(resp.data);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    GetByMostViewed(take:number, longi:number, lat:number, success, failed){
        this.itemS.GetByMostViewed(take, longi, lat, function(resp){
            var list:ItemVM[]=[];
            if(resp.data.length > 0){
                resp.data.forEach(element => {
                    var temp=new ItemVM();
                    temp.set(element);
                    this.GetIIByItemID(element.ID, function(data){
                        temp.ItemImages=data;
                    }.bind(this), function(message){
                        failed(message);
                    })
                    this.itemACF.GetByItemID(element.ID, function(subs){
                        temp.Categories=subs;
                    }.bind(this), function(message){
                        failed(message);
                    }.bind(this))
                    list.push(temp);                
                    if(list.length == resp.data.length){
                        success(list);
                    }
                });
            }else{
                success(list);
            }
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    //returns list of itemVM 
    GetByLocation(long:number, lat:number, radius:number, success, failed){
        this.itemS.GetByLocationRadius(lat, long, radius, function(resp){
            var list:ItemVM[]=[];
            if(resp.data.length > 0){
                resp.data.forEach(element => {
                    var temp=new ItemVM();
                    temp.set(element);
                    this.GetIIByItemID(element.ID, function(data){
                        temp.ItemImages=data;
                    }.bind(this), function(message){
                        failed(message);
                    })
                    this.itemACF.GetByItemID(element.ID, function(subs){
                        temp.Categories=subs;
                    }.bind(this), function(message){
                        failed(message);
                    }.bind(this))
                    list.push(temp);          
                    if(list.length == resp.data.length){
                        success(list);
                    }      
                });
            }else{
                success(list);
            }
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    GetByOwnerID(id:string, isArchived:boolean, success, failed){
        var list:ItemVM[]=[];
        this.itemS.GetByOwnerID(id,isArchived, function(resp){
            resp.data.forEach(element => {
                var temp=new ItemVM();
                temp.set(element);
                this.GetIIByItemID(element.ID, function(data){
                    temp.ItemImages=data;
                }.bind(this), function(message){
                    failed(message);
                })
                this.itemACF.GetByItemID(element.ID, function(subs){
                    temp.Categories=subs;
                }.bind(this), function(message){
                    failed(message);
                }.bind(this))
                list.push(temp);                
            });
            success(list);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    //filter item by post type
    FilterByPostType(type:number, array:ItemVM[], success){
        success(array.filter(x=>x.PostType == type));
    }
    FilterByLikeTitle(text:string, array:ItemVM[], success){
        success(array.filter(x=>x.Title.toLowerCase().indexOf(text.toLowerCase())>=0));
    }
    FilterByCategory(array:ItemVM[], id:string, success){
        success(array.filter(x=>x.Categories.findIndex(y=>y.ID==id)>=0));
    }
    FilterBySubCategory(array:ItemVM[], id:string, success){
        success(array.filter(x=>x.Categories.findIndex(y=>y.SubCategories.findIndex(c=>c.ID ==id)>=0)>=0));
    }
    Archive(item:ItemVM, api:string, success, failed){
        this.itemS.Archive(item.ID, api, item.isArchived, function(resp){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    //itemImage
    GetIIByItemID(id:string, success, failed){
        this.itemImageS.GetByItemID(id, function(resp){
            var list:ItemImageVM[]=[];
            resp.data.forEach(element => {
                var temp=new ItemImageVM();
                temp.set(element);
                list.push(temp);
            });
            success(list);
        }.bind(this), function(resp){}.bind(this))
    }
    InsertII(images:ItemImageVM[], itemID:string, success, failed){
        //insert array of item images
        images.forEach(el=>{
            this.itemImageS.Insert(el.Source, itemID, 
            function(resp){
                success(resp);
            }.bind(this), function(resp){
                failed(resp.message);
            }.bind(this))
        })
    }

    //find
    FindIndex(array:ItemVM[], item:ItemVM, success){
        var index=array.findIndex(x=>x.ID==item.ID);
        success(index);
    }
    //find by category itemVM
    FindIIIndex(array:ItemImageVM[], item:ItemImageVM, success){
        var index=array.findIndex(x=>x.ID == item.ID);
        success(index);
    }
}
