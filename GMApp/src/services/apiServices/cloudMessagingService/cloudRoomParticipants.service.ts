import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../controller/request.service';
//singleton
import {GlobalDataService} from '../../singleton/global.data';
@Injectable()
export class CloudRoomParticipantsService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, rid:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("rid", rid);
        this.rs.PostParam(this.gser.uploadURL+"/CloudRoomParticipants", this.headers, body).subscribe(resp=>{
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
        console.log("Removing this ID");
        console.log(id);
        var body=new FormData();
        body.append("id", id);
        this.rs.PostParam(this.gser.uploadURL+"CloudRoomParticipants/Remove", this.headers, body).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByRoomID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"CloudRoomParticipants/GetByRoomID?id="+id, this.headers).subscribe(resp=>{
            if(resp.json().success){
                success(resp.json());
            }else{
                failed(resp.json());
            }
        }, err=>{
            failed({message:''});
        })
    }
    GetByUserID(id:string, success, failed){
        this.rs.Get(this.gser.uploadURL+"CloudRoomParticipants/GetByUserID?id="+id, this.headers).subscribe(resp=>{
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
