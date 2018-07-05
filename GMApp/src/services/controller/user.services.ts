import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {RequestService} from './request.service';
//this one is for requesting data from request database
//view model
import {UsersViewModel} from '../../model/model.model';

@Injectable()
export class UsersServices{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    CheckIfContactNumberInUse(cNumber:string, uid:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("cNumber", cNumber);
        this.rs.PostParam(this.gser.url+"UserBase/CheckIfContactNumberInUse", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json().data);
            }else{
                failed(resp.json().message);
            }
        }, err=>{
            failed("");
        })
    }

    Authenticate(email:string, password:string, success, failed){
        let body=new FormData();
        body.append('email', email);
        body.append('pass', password);
        this.rs.PostParam(this.gser.url+"UserBase/Authenticate",this.headers, 
                         body).subscribe((data)=>{
                           if(data.json().success){
                             success(data.json());
                           }else{
                             failed(data.json());
                           }
        }, error=>{
            failed({message:''});
        });
    }
    GetByLikeEmailAddress(email:string, limit:number, success, failed){
        this.rs.Get(this.gser.url+"UserBase/GetByLikeEmailAddress?email="+email+"&limit="+limit, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    CreateUser(userInfo:UsersViewModel, appID:string, success, failed){
        var body=new FormData();
        body.append("emailAddress", userInfo.EmailAddress);
        body.append("password", userInfo.Password);
        body.append("fname", userInfo.Firstname);
        body.append("mname", userInfo.Middlename);
        body.append("lname", userInfo.Lastname);
        body.append("contactNumber", userInfo.ContactNumber);
        body.append("address", userInfo.Address);
        body.append("isAllow", "true");
        body.append("appID", appID);
        this.rs.PostParam(this.gser.url+"UserBase/CreateUser", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                console.log(failed);
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UpdatePassword(id:string, password:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("password", password);
        this.rs.PostParam(this.gser.url+"UserBase/UpdatePassword", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }  
    UpdateProfileImage(id:string, source:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("source", source);
        this.rs.PostParam(this.gser.url+"UserBase/UpdateProfileImage", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success();
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UpdateContactNumber(id:string, number:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("number", number);
        this.rs.PostParam(this.gser.url+"UserBase/UpdateContactNumber", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }

    //get userinformation from baseCOntext
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.url+"UserBase/GetByID?id="+id, this.headers).subscribe(resp=>{
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
