import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {RequestService} from '../request.service';
//this one is for requesting data from request database
//view model
import {UsersViewModel} from '../../models/model.model'
//singleton
import {GlobalDataService} from '../singleton/globalData.data'
@Injectable()
export class UsersServices{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByUID(id:string, success, failed){
        this.rs.Get(this.gser.url+"User/GetByUID?UID="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }

    Authenticate(userInfo:UsersViewModel, success, failed){
        let body=new FormData();
        body.append('email', userInfo.EmailAddress);
        body.append('pass', userInfo.Password);
        this.rs.PostParam(this.gser.dsURL+"/UserBase/Authenticate", this.headers,body).subscribe((data)=>{
                           if(data.json().success){
                             success(data.json());
                           }else{
                             failed(data.json());
                           }
        }, error=>{
            failed({message:'Please Enable Internet Connection'});
        });
    }

    IsProfileExist(uid:string, success, failed){
        this.rs.Get(this.gser.url+"User/IsProfileExist?id="+uid, this.headers).subscribe(resp=>{
            console.log(resp.json());
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UpdateProfile(uid:string, name:string, profileImage:string, success, failed){
        var body=new FormData();
        body.append("UID", uid);
        body.append("name", name);
        body.append("profileImage", profileImage);
        this.rs.PostParam(this.gser.url+"User/UpdateProfile", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UpdateProfileImage(uid:string, source:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("source", source);
        this.rs.PostParam(this.gser.url+"User/UpdateProfileImage", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    CreateUser(userInfo:UsersViewModel, success, failed){
        var body=new FormData();
        body.append("emailAddress", userInfo.EmailAddress);
        body.append("password", userInfo.Password);
        body.append("fname", userInfo.Firstname);
        body.append("mname", userInfo.Middlename);
        body.append("lname", userInfo.Lastname);
        body.append("contactNumber", userInfo.ContactNumber);
        body.append("address", userInfo.Address);
        body.append("isAllow", "true");
        this.rs.PostParam(this.gser.dsURL+"UserBase/CreateUser", this.headers, body).subscribe(resp=>{
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
