import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
//singleton
import {GlobalDataService} from '../../singleton/global.data';
@Injectable()
export class CloudMessageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(rid:string, mtype:string, text:string, api:string, cid:string, sid:string, success, failed){
        var body=new FormData();
        body.append("rid", rid);
        body.append("mtype", mtype);
        body.append("text", text);
        body.append("api", api);
        body.append("cid", cid);
        body.append("sid", sid);
        this.rs.PostParam(this.gser.uploadURL+"CloudMessage/Insert", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    Remove(id:string, success,failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.uploadURL+"CloudMessage/Remove", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"CloudMessage/GetByID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByRoom(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"CloudMessage/GetByRoom?id="+id, this.headers).subscribe(resp=>{
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
