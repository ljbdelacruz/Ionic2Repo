import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import { MyStoreVM, StoreBranchVM } from './model.model';
import {LocationStorageService} from '../../geoperson/locationTracking/locationTracking.service'
import { LocationStorageVM, PositionViewModel } from '../../geoperson/locationTracking/model.model';
@Injectable()
export class StoreBranchService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private lsS:LocationStorageService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, sid:string, aid:string, glid:string, address:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("aid", aid);
        body.append("glid", glid);
        body.append("address", address);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/SBInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, sid:string, aid:string, glid:string, address:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("aid", aid);
        body.append("glid", glid);
        body.append("address", address);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/SBUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, sid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/SBRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByIDSID(id:string, sid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/SBGetByIDSID?id="+id+"&sid="+sid, this.headers, success.bind(this), failed.bind(this))
    }
    GetBySID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/SBGetBySID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetBySIDAID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/SBGetBySIDAID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new StoreBranchVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:StoreBranchVM[]=[];
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
    InsertNewBranch(data:StoreBranchVM, location:PositionViewModel, api:string, success, failed){
        this.Insert(data.ID, data.StoreID,api, data.ID, data.Address, function(id){
            this.InsertBranchLocation(data.ID, data.ID, api, location.longitude, location.latitude, "", success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    InsertBranchLocation(id, oid:string, api:string, long:number, lat:number, desc:string, success, failed){
        this.lsS.Insert(id, oid, api, long, lat, oid+"_sb_store", desc, success.bind(this), failed.bind(this))
    }
    UpdateLocation(oid:string, api:string, long:number, lat:number, cat:string, success, failed){
        this.lsS.UpdateLocation(oid, api, long, lat, cat, success.bind(this), failed.bind(this))
    }
}
