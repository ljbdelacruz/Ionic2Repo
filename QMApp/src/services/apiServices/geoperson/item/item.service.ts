import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import {LocationStorageService} from '../locationTracking/locationTracking.service'
//this one is for requesting data from request database
//view model
import {ItemsVM} from './model.model';
import { PositionViewModel } from '../locationTracking/model.model';
@Injectable()
export class ItemService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private lsS:LocationStorageService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, aid:string, ia:boolean, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"Item/GetByID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetIDStatus(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"Item/GetByIDStatus?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByMostViewed(take:number, longitude:number, latitude:number, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"Item/GetByMostViewed?take="+take+"&longi="+longitude+"&lat="+latitude, this.headers, success.bind(this), failed.bind(this))
    }
    GetByLocationRadius(lat:number, long:number, radius:number, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"Item/GetByLocationRadius?longitude="+long+"&latitude="+lat+"&radius="+radius, this.headers, success.bind(this), failed.bind(this))
    }
    GetByOwnerID(id:string, isArchived:boolean, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"Item/GetByOwnerID?id="+id+"&archived="+isArchived, this.headers, success.bind(this), failed.bind(this))
    }
    Insert(title:string, description:string, price:number, ownerID:string, catID:string, long:number, lat:number, 
    api:string, ptype:number, success, failed){
        var body=new FormData();
        body.append("title", title);
        body.append("description", description);
        body.append("price", ""+price);
        body.append("catID", catID);
        body.append("ownerID", ownerID);
        body.append("longitude", ""+long);
        body.append("latitude", ""+lat);
        body.append("API", api);
        body.append("ptype", ""+ptype);
        this.rs.SimplifyPost(this.gser.geoURL+"Item/Insert", this.headers, body, function(id){
            //inserting the geolocation of the item where it was created
            var temp=new PositionViewModel();
            temp.longitude=long;
            temp.latitude=lat;
            //return geolocationID
            this.InsertNewAdItemLocation(id, id, api, temp, "Items", success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    Archive(id:string, api:string, isArchived:boolean, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        body.append("archive", ""+isArchived);
        this.rs.SimplifyPost(this.gser.geoURL+"Item/Archive", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, title:string, description:string, price:number, catID:string, archive:boolean, ptype:number, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("title", title);
        body.append("description", description);
        body.append("price", ""+price);
        body.append("catID", catID);
        body.append("archive", ""+archive);
        body.append("ptype", ""+ptype);
        this.rs.SimplifyPost(this.gser.geoURL+"Item/Update", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdateTimesViewed(id:string, count:number, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("count", ""+count);
        this.rs.SimplifyPost(this.gser.geoURL+"Item/UpdateTimesViewed", this.headers, body, success.bind(this), failed.bind(this))
    }
    //functions
    MToVM(object, success){
        var item=new ItemsVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ItemsVM[]=[];
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
    //insert new ad location for items
    InsertNewAdItemLocation(id:string, oid:string, api:string, position:PositionViewModel, desc:string, success, failed){
        //id of the item id should be register as ownerID in storing the itemLocation
        this.lsS.Insert(id,oid, api, position.longitude, position.latitude, oid+"_geo_items", desc, success.bind(this), failed.bin(this))
    }

}
