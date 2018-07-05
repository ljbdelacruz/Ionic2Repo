import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import { MyConnectionMemberVM } from './model.model';
//this one is for requesting data from request database
//view model
@Injectable()
export class MyConnectionMembersService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, uid:string, mcid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("mcid", mcid);
        this.rs.SimplifyPost(this.gser.url+"SessionConnection/MCMInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, mcid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("mcid", mcid);
        this.rs.SimplifyPost(this.gser.url+"SessionConnection/MCMRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByMCID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"SessionConnection/MCMGetByMCID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new MyConnectionMemberVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:MyConnectionMemberVM[]=[];
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


}
