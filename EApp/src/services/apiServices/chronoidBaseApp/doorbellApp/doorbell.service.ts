import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import { DoorbellAppVM } from './model.model';
//this one is for requesting data from request database
//view model
@Injectable()
export class MyConnectionMembersService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, name:string, glid:string, mcid:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("glid", glid);
        body.append("aid", api);
        this.rs.SimplifyPost(this.gser.url+"Doorbell/DBInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.url+"Doorbell/DBRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, name:string, glid:string, mcid:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("glid", glid);
        body.append("aid", api);
        this.rs.SimplifyPost(this.gser.url+"Doorbell/DBUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByGLID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"Doorbell/DBGetByGLID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"Doorbell/DBGetByID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByMCID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"Doorbell/DBGetByMCID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new DoorbellAppVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:DoorbellAppVM[]=[];
        if(list.length>0){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length-1){
                        success(nlist);
                    }
                }.bind(this))
            });
        }else{
            success(nlist);
        }
    }

    InsertDoorbellLocation(){
        
    }
}
