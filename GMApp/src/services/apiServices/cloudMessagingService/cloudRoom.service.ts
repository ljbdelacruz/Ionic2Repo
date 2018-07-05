import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
//singleton
import {GlobalDataService} from '../../singleton/global.data';

@Injectable()
export class CloudRoomService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"CloudRoom/GetByID?id="+id, this.headers).subscribe(resp=>{
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
