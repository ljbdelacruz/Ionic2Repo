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
export class VlogSegmentTypeService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Get(success, failed){
        this.rs.Get(this.gser.url+"VlogSegmentType/Get", this.headers).subscribe(resp=>{
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
