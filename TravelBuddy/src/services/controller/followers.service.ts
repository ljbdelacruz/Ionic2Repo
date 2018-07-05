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
export class FollowersService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    IsFollowing(followingID:string, followedID:string, success, failed){
        this.rs.Get(this.gser.url+"Followers/IsFollowing?followingID="+followingID+"&followedID="+followedID, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        },err=>{
            failed({message:''});
        })
    }

    GetFollowedUsers(uid:string, success, failed){
        this.rs.Get(this.gser.url+"Followers/GetFollowedUsers?UID="+uid, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetFollowersCount(id:string, success, failed){
        this.rs.Get(this.gser.url+"Followers/GetFollowerCount?ID="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetFollowingCount(id:string, success, failed){
        this.rs.Get(this.gser.url+"Followers/GetFollowingCount?ID="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    //following -imung id na nag follow
    //follwed - id sa imung gina follow nga user
    Insert(followingUID:string, followedUID:string, success, failed){
        var body=new FormData();
        body.append("FollowingUID", followingUID);
        body.append("FollowedUID", followedUID);
        this.rs.PostParam(this.gser.url+"Followers/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Unfollow(followingUID:string, followedUID:string, success, failed){
        var body=new FormData();
        body.append("FollowingUID", followingUID);
        body.append("FollowedUID", followedUID);
        this.rs.PostParam(this.gser.url+"Followers/Unfollow", this.headers, body).subscribe(resp=>{
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
