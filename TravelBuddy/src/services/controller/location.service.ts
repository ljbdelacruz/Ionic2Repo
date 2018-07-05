import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/globalData.data';
import {RequestService} from '../request.service'
@Injectable()
export class LocationService{
    
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    GetUserLocationByID(uid:string, success,failed){
        this.rs.Get(this.gser.dsURL+"Location/GetULByUID?ID="+uid, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        },error=>{
            console.log(error);
        })
    }
    //update by UserID
    UpdateUserLocationByID(uid:string, long:number, lat:number, success, failed){
        var body=new FormData();
        body.append("UID", uid);
        body.append("longitude", ""+long);
        body.append("latitude", ""+lat);
        this.rs.PostParam(this.gser.dsURL+"Location/UpdateUL", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        },error=>{
            failed({message:'Sorry server cannot be reached'});
        })
    }
    Insert(uid:string, longi:number, lat:number, success, failed){
        var body=new FormData();
        body.append("UID", uid);
        body.append("longitude", ""+longi);
        body.append("latitude", ""+lat);
        this.rs.PostParam(this.gser.dsURL+"Location/InsertUL", this.headers, body).subscribe(resp=>{
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
