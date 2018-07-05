import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import { StoreEmployeesVM } from './model.model';
import {LocationStorageService} from '../../geoperson/locationTracking/locationTracking.service'
import { LocationStorageVM, PositionViewModel } from '../../geoperson/locationTracking/model.model';
@Injectable()
export class StoreEmployeesService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private lsS:LocationStorageService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, uid:string, sid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("sid", sid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/SEInsert", this.headers, body, success.bind(this), failed.bind(this))        
    }
    Remove(id:string, aid:string, sid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/SEInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetBySID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/SEGetBySID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/SEGetByID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new StoreEmployeesVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:StoreEmployeesVM[]=[];
        if(list.length > 0){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length){
                        success(nlist);
                    }
                }.bind(this))
            });
        }else{
            success(nlist);
        }
    }
}
