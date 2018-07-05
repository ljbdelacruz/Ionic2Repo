import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import { UserAccessLevelVM } from './model.model';
@Injectable()
export class UserAccessLevelService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(uid:string, access:string, app:string, success, failed){
        var body=new FormData();
        body.append("uid", uid);
        body.append("access", access);
        body.append("app", app);
        this.rs.SimplifyPost(this.gser.url+"UserAccessLevel/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByUserID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"UserAccessLevel/GetByUserID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByUID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"UserAccessLevel/GetByUID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    //functions
    MToVM(object, success){
        var item=new UserAccessLevelVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:UserAccessLevelVM[]=[];
        list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length){
                        success(nlist);
                    }
                }.bind(this))
        });
    }
}
