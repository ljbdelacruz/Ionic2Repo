import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../request.service'

@Injectable()
export class ItemCategoryService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.geoURL+"ItemCategory/GetByID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetAll(success, failed){
        this.rs.Get(this.gser.geoURL+"ItemCategory/GetAll", this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Insert(name:string, success, failed){
        var body=new FormData();
        body.append("name", name);
        this.rs.PostParam(this.gser.geoURL+"ItemCategory/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Update(id:string, name:string, archive:boolean,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("archive", ""+archive);
        this.rs.PostParam(this.gser.geoURL+"ItemCategory/Update", this.headers, body).subscribe(resp=>{
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
