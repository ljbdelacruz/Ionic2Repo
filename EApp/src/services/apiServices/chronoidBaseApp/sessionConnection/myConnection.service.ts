import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import { MyConnectionVM } from './model.model';
//this one is for requesting data from request database
//view model
@Injectable()
export class MyConnectionService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    Insert(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.url+"SessionConnection/MCInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.url+"SessionConnection/MCRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByOID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"SessionConnection/MCGetByOID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new MyConnectionVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:MyConnectionVM[]=[];
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
