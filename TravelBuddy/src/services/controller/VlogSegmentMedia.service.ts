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
export class VlogSegmentMediaService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.url+"VlogSegmentMedia/GetByID?ID="+id, this.headers).subscribe(resp=>{
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
        this.rs.Get(this.gser.url+"VlogSegmentMedia/GetByVlogSegmentDescriptionID?ID="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Insert(source:string, vlogSegmentDescriptionID:string, type:string, index:number, success, failed){
        var body=new FormData();
        body.append("source", source);
        body.append("vlogSegmentDescriptionID", vlogSegmentDescriptionID);
        body.append("type", type);
        body.append("do", ""+index);
        this.rs.PostParam(this.gser.url+"VlogSegmentMedia/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("ID", id);
        this.rs.PostParam(this.gser.url+"VlogSegmentMedia/Remove", this.headers, body).subscribe(resp=>{
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
