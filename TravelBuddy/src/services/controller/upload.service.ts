import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {RequestService} from '../request.service';
//this one is for requesting data from request database
//view model
import {UsersViewModel} from '../../models/model.model'
//singleton
import {GlobalDataService} from '../singleton/globalData.data'
@Injectable()
export class UploadService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    UploadImage(file, success, failed){
        var body=new FormData();
        body.append("file", file);
        body.append("path", "TravelBuddy");
        this.rs.PostParam(this.gser.uploadURL+"Upload/Image", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UploadProfileImage(file, success, failed){
        var body=new FormData();
        body.append("file", file);
        body.append("path", "TravelBuddy/ProfileImage");
        this.rs.PostParam(this.gser.uploadURL+"Upload/UploadImage1", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    UploadMediaFiles(file, success, failed){
        var body=new FormData();
        body.append("file", file);
        body.append("path", "TravelBuddy/Media");
        this.rs.PostParam(this.gser.uploadURL+"Upload/UploadImage1", this.headers, body).subscribe(resp=>{
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
