import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../request.service'

@Injectable()
export class ItemImageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByItemID(id:string, success, failed){
        this.rs.Get(this.gser.geoURL+"ItemImage/GetByItemID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }

    Insert(source:string, itemID:string, success, failed){
        var body=new FormData();
        body.append("source", source);
        body.append("itemID", itemID);
        this.rs.PostParam(this.gser.geoURL+"ItemImage/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.geoURL+"ItemImage/Remove", this.headers, body).subscribe(resp=>{
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
