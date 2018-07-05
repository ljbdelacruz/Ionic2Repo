import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../request.service'

@Injectable()
export class ItemService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetIDStatus(id:string, success, failed){
        this.rs.Get(this.gser.geoURL+"Item/GetByIDStatus?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        },err=>{
            failed({message:''})
        })
    }
    GetByMostViewed(take:number, longitude:number, latitude:number, success, failed){
        this.rs.Get(this.gser.geoURL+"Item/GetByMostViewed?take="+take+"&longi="+longitude+"&lat="+latitude, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByLocationRadius(lat:number, long:number, radius:number, success, failed){
        this.rs.Get(this.gser.geoURL+"Item/GetByLocationRadius?longitude="+long+"&latitude="+lat+"&radius="+radius, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByOwnerID(id:string, isArchived:boolean, success, failed){
        this.rs.Get(this.gser.geoURL+"Item/GetByOwnerID?id="+id+"&archived="+isArchived, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
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
        this.rs.PostParam(this.gser.geoURL+"Item/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Archive(id:string, api:string, isArchived:boolean, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        body.append("archive", ""+isArchived);
        this.rs.PostParam(this.gser.geoURL+"Item/Archive", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
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
        this.rs.PostParam(this.gser.geoURL+"Item/Update", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UpdateTimesViewed(id:string, count:number, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("count", ""+count);
        this.rs.PostParam(this.gser.geoURL+"Item/UpdateTimesViewed", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }

    

}
