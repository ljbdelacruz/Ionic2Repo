import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import { AccessLevelVM } from './model.model';
@Injectable()
export class AccessLevelService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.url+"AccessLevel/GetByID?id="+id, this.headers).subscribe(resp=>{
            this.ReturnUpdate(resp, success.bind(this), failed.bind(this));
        }, err=>{
            failed("");
        })
    }
    ReturnUpdate(resp, success, failed){
        if(resp.json().success){
            success(resp.json().data);
        }else{
            failed(resp.json().message)
        }
    }
    MToVM(object, success){
        var item=new AccessLevelVM();
        item.set(object);
        success(item);
    }
}
