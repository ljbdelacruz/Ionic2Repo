import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
import { GroupingsDataVM } from './model.model';
import {ImageLinkStorageService} from '../../uploaderService/imageLinkStorage/imageLinkStorage.service'
import { ImageLinkStorageVM } from '../../uploaderService/imageLinkStorage/model.model';
import {GeneralService} from '../../../general.service'
//this one is for requesting data from request database
//view model
@Injectable()
export class GroupingsDataService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private ilsS:ImageLinkStorageService, private gSer:GeneralService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, sid:string, oid:string, aid:string, order:number, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("or", ""+order);
        this.rs.SimplifyPost(this.gser.url+"GroupingsData/GDInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.url+"GroupingsData/GDRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByOID(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"GroupingsData/GDGetByOID?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new GroupingsDataVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:GroupingsDataVM[]=[];
        if(list.length>0){
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
    GetByOIDVM(oid:string, api:string, success, failed){
        this.GetByOID(oid, api, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }

    //get grouping and its ImageLinkDataContext
    GetByOIDWithIML(oid:string, api:string, success, failed){
        this.GetByOIDVM(oid, api, function(models){
           this.GetImageLinkByGroupingData(models, api, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetImageLinkByGroupingData(list:GroupingsDataVM[], api:string, success, failed){
        var index=0;
        if(list.length > 0){
            list.forEach(el=>{
                this.ilsS.GetImage(el.SourceID, api, function(model){
                    el.Image=model;
                    index++;
                    if(index==list.length){
                        success(list);
                    }
                }.bind(this), failed.bind(this))
            })
        }else{
            success(list);
        }
    }
    InsertByList(list:GroupingsDataVM[], api:string, success, failed){
        var index=0;
        if(list.length > 0){
            list.forEach(el=>{
                if(el.ID.length <= 0){
                    this.InsertNew(el.SourceID, el.OwnerID, api, index, function(){
                        index++;
                        if(index==list.length){
                            success();
                        }
                    }.bind(this), failed.bind(this))
                }else{
                    index++;
                    if(index==list.length){
                        success();
                    }
                }
            })
        }else{
            success();
        }
    }
    InsertNew(sourceID:string, oid:string, api:string, order:number, success, failed){
        this.gSer.GenerateID(function(id){
            this.Insert(id, sourceID, oid, api, order, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }

}
