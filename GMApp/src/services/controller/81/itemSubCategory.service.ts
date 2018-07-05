import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../request.service'

@Injectable()
export class ItemSubCategoryService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByCategory(id:string, success, failed){
        this.rs.Get(this.gser.geoURL+"ItemSubCategory/GetByCategory?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Insert(name:string, catID:string, success, failed){
        var body=new FormData();
        body.append("name", name);
        body.append("catID", catID);
        this.rs.PostParam(this.gser.geoURL+"ItemSubCategory/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Update(id:string, name:string, archive:boolean, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("archived", ""+archive);
        this.rs.PostParam(this.gser.geoURL+"ItemSubCategory/Update", this.headers, body).subscribe(resp=>{
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
