import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../request.service';
//singleton
import {GlobalDataService} from '../../singleton/global.data';

@Injectable()
export class UploadService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    UploadItems(file, success, failed){
        var body=new FormData();
        body.append("file", file);
        body.append("path", "GEO/Items");
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
