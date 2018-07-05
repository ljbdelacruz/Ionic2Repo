import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../request.service';
//this one is for requesting data from request database
//view model
import {VlogConnection} from '../../models/model.model'
//singleton
import {GlobalDataService} from '../singleton/globalData.data'
@Injectable()
export class VlogConnectionService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    //vlog segments
    GetByOwnerID(id:string, success, failed){
        this.rs.Get(this.gser.url+"VlogConnection/OrderByUpdatedAt?uid="+id, this.headers).subscribe(data=>{
            if(data.json().success){
                success(data.json());
            }else{failed(data.json());}
        }, err=>{
            console.log(err);
            failed({message:''});
        })
    }
    //gets user following feed
    GetUserNewsFeed(uid:string, success, failed){
        this.rs.Get(this.gser.url+"VlogConnection/GetByFollowingID?uid="+uid, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Create(country:string, title:string, intro:string, userID:string, success, failed){
        var body=new FormData();
        body.append("country", country);
        body.append("title", title);
        body.append("intro", intro);
        body.append("UID", userID);
        this.rs.PostParam(this.gser.url+"VlogConnection/Create", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''})
        })
    }
    Archive(ID:string, userID:string, success, failed){
        var body=new FormData();
        body.append("ID", ID);
        body.append("UID", userID);
        this.rs.PostParam(this.gser.url+"VlogConnection/Archive", this.headers, body).subscribe(resp=>{
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
