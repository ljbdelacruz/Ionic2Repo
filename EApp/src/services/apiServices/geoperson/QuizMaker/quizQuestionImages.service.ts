import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizQuestionAnswerVM } from './model.model';
@Injectable()
export class QuizQuestionImagesService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, ilid:string, qqid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("ilid", ilid);
        body.append("qqid", qqid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQIInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, qqid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qqid", qqid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQIRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Get(qqid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QQIGet", this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new QuizQuestionAnswerVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizQuestionAnswerVM[]=[];
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
