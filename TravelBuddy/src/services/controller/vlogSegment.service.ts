import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../request.service';
//this one is for requesting data from request database
//view model
import {VlogConnection} from '../../models/model.model'
//singleton
import {GlobalDataService} from '../singleton/globalData.data'
@Injectable()
export class VlogSegmentService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByVlogID(id, success, failed){
        this.rs.Get(this.gser.url+"VlogSegments/GetByVlogID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''})
        })
    }
    Insert(text:string, typeID:string, vlogConnectionID:string, displayOrder:number, success, failed){
        var body=new FormData();
        body.append("text", text);
        body.append("typeid", typeID);
        body.append("vcID", vlogConnectionID);
        body.append("do", ""+displayOrder);
        this.rs.PostParam(this.gser.url+"VlogSegments/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Update(id:string, text:string, typeID:string, displayOrder:number, success,failed){
        var body=new FormData();
        body.append("id", id);
        body.append("text", text);
        body.append("typeID", typeID);
        body.append("do", ""+displayOrder);
        this.rs.PostParam(this.gser.url+"VlogSegments/Update", this.headers, body).subscribe(resp=>{
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
        //this one deletes the segment parts and the segment
        var body=new FormData();
        body.append("uid", id);
        this.rs.PostParam(this.gser.url+"", this.headers, body).subscribe(resp=>{
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
