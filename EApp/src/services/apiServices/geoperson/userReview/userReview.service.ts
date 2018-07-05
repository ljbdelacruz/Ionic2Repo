import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import {UserReviewVM} from './model.model';
@Injectable()
export class UserReviewService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }    
    GetByItemID(id:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"UserReview/GetByID?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    CalculateUserReviews(id:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"UserReview/CalculateUserReviews?id="+id+"&api="+api, this.headers, success.bind(this), failed.bind(this))
    }
    GetByUserID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"UserReview/GetByUserID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    Insert(comment:string, uid:string, sid:string, aid:string, stars:number, success, failed){
        var body=new FormData();
        body.append("comment", comment);
        body.append("uid", uid);
        body.append("sid", sid);
        body.append("api", aid);
        body.append("stars", ""+stars);
        this.rs.SimplifyPost(this.gser.geoURL+"UserReview/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.geoURL+"UserReview/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    
    MToVM(object, success){
        var item=new UserReviewVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:UserReviewVM[]=[];
        if(list.length > 0){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index<=list.length){
                        success(nlist);
                    }
                }.bind(this))
            });
        }else{
            success(nlist);
        }
    }
}
