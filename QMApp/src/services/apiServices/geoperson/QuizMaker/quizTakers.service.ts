import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizTakersVM } from './model.model';
@Injectable()
export class QuizTakersService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, qiid:string, uid:string, tp:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        body.append("uid", uid);
        body.append("tp", tp);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QTInsert", this.headers, body, success.bind(this), failed.bind(this));
    }
    Update(id:string, qiid:string, tp:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        body.append("tp", tp);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QTUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, qiid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QTRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QTGetByID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByQuizInfoID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QTGetByQuizInfoID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByUID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QTGetByUID?id="+id, this.headers, success.bind(this), success.bind(this))
    }
    GetByUIDQuizInfoID(id:string, qiid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QTGetByUIDQuizInfoID?id="+id+"&qiid="+qiid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new QuizTakersVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizTakersVM[]=[];
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


}
