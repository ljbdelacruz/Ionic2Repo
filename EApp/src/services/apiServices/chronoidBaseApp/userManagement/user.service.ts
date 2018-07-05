import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import {LocationStorageService} from '../../geoperson/locationTracking/locationTracking.service'
//this one is for requesting data from request database
//view model
import {UsersViewModel} from './model.model';
import { PositionViewModel } from '../../geoperson/locationTracking/model.model';
@Injectable()
export class UsersServices{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private lsS:LocationStorageService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Authenticate(email:string, password:string, success, failed){
        let body=new FormData();
        body.append('email', email);
        body.append('pass', password);
        this.rs.SimplifyPost(this.gser.url+"UserBase/Authenticate", this.headers, body, success.bind(this), failed.bind(this))
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
        this.rs.SimplifyPost(this.gser.url+"UserBase/CreateUser", this.headers, body, success.bind(this), failed.bind(this))
    }
    CheckIfContactNumberInUse(cNumber:string, uid:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("cNumber", cNumber);
        this.rs.SimplifyPost(this.gser.url+"UserBase/CheckIfContactNumberInUse", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdatePassword(id:string, password:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("password", password);
        this.rs.SimplifyPost(this.gser.url+"UserBase/UpdatePassword", this.headers, body, success.bind(this), failed.bind(this))
    }  
    UpdateProfileImage(id:string, source:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("source", source);
        this.rs.SimplifyPost(this.gser.url+"UserBase/UpdateProfileImage", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdateContactNumber(id:string, number:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("number", number);
        this.rs.SimplifyPost(this.gser.url+"UserBase/UpdateContactNumber", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdateAccess(id:string, access:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"UserBase/UpdateAccess?id="+id+"&access="+access, this.headers, success.bind(this), failed.bind(this))
    }
    //get userinformation from baseCOntext
    GetByLikeEmailAddress(email:string, limit:number, success, failed){
        this.rs.SimplifyGet(this.gser.url+"UserBase/GetByLikeEmailAddress?email="+email+"&limit="+limit, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"UserBase/GetByID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    //functions
    MToVM(object, success){
        var item=new UsersViewModel();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:UsersViewModel[]=[];
        if(list.length > 0){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length-1){
                        success(nlist);
                    }
                }.bind(this))
            });
        }else{
            success(nlist);
        }
    }
    //insert new ad location for items
    InsertNewUserLocation(id:string, oid:string, api:string, position:PositionViewModel, desc:string, success, failed){
        this.lsS.Insert(id, oid, api, position.longitude, position.latitude, "cruser", desc, success.bind(this), failed.bin(this))
    }
}
