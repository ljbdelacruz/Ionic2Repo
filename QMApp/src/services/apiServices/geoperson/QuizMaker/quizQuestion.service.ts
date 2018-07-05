import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizQuestionsVM } from './model.model';
import {GeneralService} from '../../../general.service'
import {GroupingsDataService} from '../../chronoidBaseApp/groupings/groupings.service'
import { GroupingsDataVM } from '../../chronoidBaseApp/groupings/model.model';
import {ImageLinkStorageService} from '../../uploaderService/imageLinkStorage/imageLinkStorage.service'
@Injectable()
export class QuizQuestionService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService, private gSer:GeneralService, private gdS:GroupingsDataService,
    private ilsS:ImageLinkStorageService){
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
    GetByQuizInfoVM(id:string, success, failed){
        this.GetByQuizInfo(id, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
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
    InsertNewQuestion(item:QuizQuestionsVM, qiid:string, insertChoiceEv, success, failed){
        this.Insert(item.ID, item.Questions, qiid, ""+item.Order, ""+item.Points, item.Status, function(){
            insertChoiceEv(success.bind(this), failed.bind(this));
        }.bind(this), failed.bind(this))
    }
    UpdateChoice(item:QuizQuestionsVM, qiid:string, insertChoiceEv, success, failed){
        this.Update(item.ID, qiid, item.Questions, ""+item.Points, function(){
            insertChoiceEv(success.bind(this), failed.bind(this));
        }.bind(this), failed.bind(this))
    }
    //using grouping data
    InsertNewImages(list:GroupingsDataVM[], api:string, success, failed){
        this.gdS.InsertByList(list, api, success.bind(this), failed.bind(this));
    }
    GetImagesQQIDS(list:QuizQuestionsVM[], api:string, success, failed){
        var index=0;
        list.forEach(el=>{
            this.GetImagesQQID(el.ID, api, function(models){
                el.QuizImages=models;
                index++;
                if(index==list.length){
                    success(list);
                }
            }.bind(this), failed.bind(this))
        })
    }
    GetImagesQQID(qqid:string, api:string, success, failed){
        //get images by qqid
        this.gdS.GetByOIDWithIML(qqid, api, success.bind(this), failed.bind(this))
    }
    RemoveImage(data:GroupingsDataVM, api:string, success, failed){
        this.gdS.Remove(data.ID, data.OwnerID, api, function(){
            this.ilsS.Remove(data.SourceID, api, data.OwnerID, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }

}
