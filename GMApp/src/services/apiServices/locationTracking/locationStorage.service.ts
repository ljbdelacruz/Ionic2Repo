import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
import {GeneralService} from '../../general.service'
import {PositionViewModel} from './model.model'
//singleton
import {GlobalDataService} from '../../singleton/global.data';
@Injectable()
export class LocationStorageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService, private gSer:GeneralService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(oid:string, api:string, longitude:number, latitude:number, cat:string, success, failed){
        var body=new FormData();
        body.append("oid", oid);
        body.append("api", api);
        body.append("longitude", ""+longitude);
        body.append("latitude", ""+latitude);
        body.append("cat", cat);
        this.rs.PostParam(this.gser.geoURL+"LocationStorage/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        },err=>{
            failed({message:''});
        })
    }
    UpdateLocation(oid:string, api:string, longitude:number, latitude:number, success, failed){
        var body=new FormData();
        body.append("oid", oid);
        body.append("api", api);
        body.append("longitude", ""+longitude);
        body.append("latitude", ""+latitude);
        this.rs.PostParam(this.gser.geoURL+"LocationStorage/UpdateLocation", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByIDAdmin(id:string, cat:string, success, failed){
        var body=new FormData();
        body.append("oid", id)
        body.append("cat", cat)
        this.rs.PostParam(this.gser.geoURL+"LocationStorage/GetByIDAdmin", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        })
    }

    GetByOwnerID(id:string, api:string, success, failed){
        this.rs.Get(this.gser.geoURL+"LocationStorage/GetByOwnerID?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByID(id:string, api, success, failed){
        this.rs.Get(this.gser.geoURL+"LocationStorage/GetByID?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByCategory(cat:string, api:string, success, failed){
        this.rs.Get(this.gser.geoURL+"LocationStorage/GetByCategory?cat="+cat+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByLocationRadius(long:number, lat:number, cat:string, api:string, success, failed){
        this.rs.Get(this.gser.geoURL+"LocationStorage/GetByLocationRadius?lon="+long+"&lat="+lat+"&cat="+cat+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetCurrentUserLocation(success, failed){
        this.gSer.GetCurrentLocation(function(resp){
            var model=new PositionViewModel();
            model.set(resp.long, resp.lat);
            success(model);
        }.bind(this), function(resp){
            failed("failed getting user location");
        }.bind(this))
    }
    


}
