import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
import {ImageLinkStorageService} from '../../uploaderService/imageLinkStorage/imageLinkStorage.service'
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { IS_ItemImagesVM } from './model.model';
import { ImageLinkStorageVM } from '../../uploaderService/imageLinkStorage/model.model';
@Injectable()
export class IS_ItemImageService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService,
    private ilsS:ImageLinkStorageService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(source, ii, success, failed){
        var body=new FormData();
        body.append("source", source);
        body.append("ii", ii);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_ItemImage/Insert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, ii:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("ii", ii);
        this.rs.SimplifyPost(this.gser.geoURL+"IS_ItemImage/Remove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByItemID(itemID:string, success, failed){
       this.rs.SimplifyGet(this.gser.geoURL+"IS_ItemImage/GetByItemID?itemID="+itemID, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, iid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"IS_ItemImage/GetByID?id="+id+"&iid="+iid, this.headers, success.bind(this), failed.bind(this))
    }
    //convert object to view model here
    MToVM(object, success){
            var item=new IS_ItemImagesVM();
            item.set(object);
            success(item);
    }
    MsToVMs(list, success){
            var index=0;
            var nlist:IS_ItemImagesVM[]=[];
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length-1){
                        success(nlist);
                    }
                }.bind(this))
            });
    }
    InsertImage(id:string, source:string, api:string, oid:string, success, failed){
        this.ilsS.Insert(id, api, oid, source, success.bind(this), failed.bind(this))
    }
    GetILSByList(is_imgvm:IS_ItemImagesVM[], api:string, success, failed){
        var list:ImageLinkStorageVM[]=[];
        var index=0;
        is_imgvm.forEach(el=>{
            this.ilsS.GetByID(el.ImageLinkID, api, function(model){
                list.push(model);
                index++;
                if(index==is_imgvm.length-1){
                    success(list);
                }
            }.bind(this), failed.bind(this))
        })
    }    
}
