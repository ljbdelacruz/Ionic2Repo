import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../request.service';
//this one is for requesting data from request database
//view model
import {VlogConnection} from '../../models/model.model'
//singleton
import {GlobalDataService} from '../singleton/globalData.data'
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Injectable()
export class VlogSegmentLocationService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.url+"VlogSegmentLocation/GetByID?ID="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByVlogSegmentDescriptionID(id:string, success, failed){
        this.rs.Get(this.gser.url+"VlogSegmentLocation/GetByVlogSegmentDescriptionID?ID="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    RemoveByID(id:string, success, failed){
        var body=new FormData();
        body.append("ID", id);
        this.rs.PostParam(this.gser.url+"VlogSegmentLocation/RemoveByID", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Insert(GetByVlogSegmentDescriptionID:string, longitude:number, latitude:number, success, failed){
        var body=new FormData();
        body.append("vlogSegmentDescriptionID", GetByVlogSegmentDescriptionID);
        body.append("longitude", ""+longitude);
        body.append("latitude", ""+latitude);
        this.rs.PostParam(this.gser.url+"VlogSegmentLocation/Insert", this.headers, body).subscribe(resp=>{
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
