import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../request.service'

@Injectable()
export class UserReviewService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, api:string, success, failed){
        this.rs.Get(this.gser.geoURL+"UserReview/GetByID?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByUserID(id:string, success, failed){
        this.rs.Get(this.gser.geoURL+"UserReview/GetByUserID?id="+id+"&aid="+this.gser.geoMarketAPI, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    CalculateUserReviews(id:string, api:string, success, failed){
        this.rs.Get(this.gser.geoURL+"UserReview/CalculateUserReviews?id="+id+"&api="+api, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }

    Insert(comment:string, uid:string, sid:string, api:string, stars:number, success, failed){
        var body=new FormData();
        body.append("comment", comment);
        body.append("uid", uid);
        body.append("sid", sid);
        body.append("api", api);
        body.append("stars", ""+stars);
        this.rs.PostParam(this.gser.geoURL+"UserReview/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        })        
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.geoURL+"UserReview/Remove", this.headers, body).subscribe(resp=>{
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
