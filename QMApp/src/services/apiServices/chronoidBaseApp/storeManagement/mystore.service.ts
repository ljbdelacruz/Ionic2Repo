import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../../singleton/global.data';
import {RequestService} from '../../../request.service';
//this one is for requesting data from request database
//view model
import { MyStoreVM } from './model.model';
import {ImageLinkStorageService} from '../../uploaderService/imageLinkStorage/imageLinkStorage.service'
@Injectable()
export class MyStoreService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private ilsS:ImageLinkStorageService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, uid:string, name:string, appID:string, scid:string, sbiid:string, slid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("name", name);
        body.append("aid", appID);
        body.append("scid", scid);
        body.append("sbid", sbiid);
        body.append("slid", slid);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/MSInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id, aid, uid, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        body.append("uid", uid);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/MSRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id, uid, aid, name, sbiid, catid, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("name", name);
        body.append("aid", aid);
        body.append("catID", catid);
        body.append("sbiid", sbiid);
        this.rs.SimplifyPost(this.gser.url+"StoreManagement/MSUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, uid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/MSGetByID?id="+id+"&uid="+uid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByUIDAppID(uid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/MSGetByUIDAppID?uid="+uid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByAppID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.url+"StoreManagement/MSGetByAppID?aid="+id, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new MyStoreVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:MyStoreVM[]=[];
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
    GetImages(stores:MyStoreVM[], api:string, success, failed){
        var index=0;
        stores.forEach(el=>{
            //background
            this.GetImage(el, api, function(){
                index++;
                if(index==stores.length){
                    success(stores);
                }
            }.bind(this), failed.bind(this))
        })
    }
    GetImage(store:MyStoreVM, api:string, success, failed){
        
        this.ilsS.GetImage(store.StoreBackgroundImageID,api, function(bgvm){
            store.BackgroundImage=bgvm;
            this.ilsS.GetImage(store.StoreLogoID, api, function(logovm){
                store.LogoImage=logovm;
                success(store);
            }.bind(this), failed.bind(this))
          }.bind(this), failed.bind(this))
   
    }


}
