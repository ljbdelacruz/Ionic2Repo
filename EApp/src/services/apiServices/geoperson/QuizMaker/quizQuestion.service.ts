import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizQuestionsVM } from './model.model';
@Injectable()
export class QuizQuestionService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, quest:string, qi:string, order:string, point:string, status:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("quest", quest);
        body.append("qi", qi);
        body.append("order", order);
        body.append("point", point);
        body.append("status", status);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQInsert", this.headers, body,success.bind(this), failed.bind(this))
    }
    Update(id:string, qi:string, quest:string, point:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qi", qi);
        body.append("quest", quest);
        body.append("point",point);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, qiid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQRemove", this.headers, body, success.bind(this), failed.bind(this));
    }
    GetByQuizInfo(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QQGetByQuizInfo?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new QuizQuestionsVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizQuestionsVM[]=[];
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
    RemoveList(list:QuizQuestionsVM[], qiid:string, success, failed){
        var index=0;
        if(list.length>0){
            list.forEach(el=>{
                this.Remove(el.ID, qiid, function(){
                  index++;
                  if(index==list.length){
                    success();
                  }
                }.bind(this), failed.bind(this))
              })
        }else{
            success();
        }
    }
    FindByIDIndex(list:QuizQuestionsVM[], id, success){
        success(list.findIndex(x=>x.ID == id));
    }

}
