import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../request.service';
//this one is for requesting data from request database
//singleton
import {GlobalDataService} from '../singleton/globalData.data'
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Injectable()
export class RecommendationService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    IsRecommended(UID:string, vlogConnID:string, success, failed){
        this.rs.Get(this.gser.url+"Recommendation/IsRecommendUIDVlogConnID?UID="+UID+"&VlogConnID="+vlogConnID, this.headers)
        .subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        },err=>{
            failed({message:''});
        })
    }

    GetRecommendationCountVlogConnection(id:string, success, failed){
        this.rs.Get(this.gser.url+"Recommendation/GetCountVlogConnectionID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Insert(uid:string, vlogConnID:string, success, failed){
        var body=new FormData();
        body.append("UID", uid);
        body.append("vlogConnID", vlogConnID);
        this.rs.PostParam(this.gser.url+"Recommendation/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    RemoveByUIDVlogConnID(uid:string, vlogConnID:string, success, failed){
        var body=new FormData();
        body.append("UID", uid);
        body.append("vlogConnID", vlogConnID);
        this.rs.PostParam(this.gser.url+"Recommendation/RemoveByUIDVlogID", this.headers, body).subscribe(resp=>{
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
