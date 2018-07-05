import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../request.service'

@Injectable()
export class ItemAssignCategoryService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    GetByItemID(id:string, success, failed){
        this.rs.Get(this.gser.geoURL+"ItemAssignCategory/GetByItemID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Insert(itemId:string, subCat:string, success, failed){
        var body=new FormData();
        body.append("iid", itemId);
        body.append("subCat", subCat);
        this.rs.PostParam(this.gser.geoURL+"ItemAssignCategory/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Update(itemID:string, subCatID:string, success, failed){
        var body=new FormData();
        body.append("id", itemID);
        body.append("subCat", subCatID);
        this.rs.PostParam(this.gser.geoURL+"ItemAssignCategory/Update", this.headers, body).subscribe(resp=>{
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
