import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
import {PositionViewModel} from './model.model'
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
@Injectable()
export class LocationStorageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id, oid:string, api:string, longitude:number, latitude:number, cat:string, desc:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("api", api);
        body.append("longitude", ""+longitude);
        body.append("latitude", ""+latitude);
        body.append("cat", cat);
        body.append("desc", desc);
        this.rs.SimplifyPost(this.gser.geoURL+"LocationStorage/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdateLocation(oid:string, api:string, longitude:number, latitude:number, cat:string, success, failed){
        var body=new FormData();
        body.append("oid", oid);
        body.append("api", api);
        body.append("longitude", ""+longitude);
        body.append("latitude", ""+latitude);
        body.append("cat", cat);
        this.rs.SimplifyPost(this.gser.geoURL+"LocationStorage/UpdateLocation", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByCategoryLocationRadius(lng:number, lat:number, cat:string, aid:string, rad:number, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"LocationStorage/GetByCategoryLocationRadius?lng="+lng+"&lat="+lat+"&cat="+cat+"&aid="+aid+"&rad="+rad, this.headers, success.bind(this), failed.bind(this))
    }
    GetByIDAdmin(id:string, cat:string, success, failed){
        var body=new FormData();
        body.append("oid", id)
        body.append("cat", cat)
        this.rs.SimplifyPost(this.gser.geoURL+"LocationStorage/GetByIDAdmin", this.headers, body, success.bind(this), failed.bind(this))
    }

    GetByOwnerID(id:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"LocationStorage/GetByOwnerID?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, api, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"LocationStorage/GetByID?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    GetByCategory(cat:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"LocationStorage/GetByCategory?cat="+cat+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    GetByLocationRadius(long:number, lat:number, cat:string, api:string, rad:number, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"LocationStorage/GetByLocationRadius?lon="+long+"&lat="+lat+"&cat="+cat+"&api="+api+"&rad="+rad, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new PositionViewModel();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:PositionViewModel[]=[];
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
