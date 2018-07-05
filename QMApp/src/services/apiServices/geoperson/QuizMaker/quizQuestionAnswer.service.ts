import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizQuestionAnswerVM } from './model.model';
import {GeneralService} from '../../../general.service'
import {GroupingsDataService} from '../../chronoidBaseApp/groupings/groupings.service'
import { GroupingsDataVM } from '../../chronoidBaseApp/groupings/model.model';
@Injectable()
export class QuizQuestionAnswerService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService, private gSer:GeneralService, private gdS:GroupingsDataService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, desc:string, isCorrect:string, qqid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("desc", desc);
        body.append("isCorrect", isCorrect);
        body.append("qqid", qqid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQAInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, desc:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("desc", desc);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQAUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, qqid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qqid", qqid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QQARemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByQQID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QQAGetByQQID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByQQIDVM(id:string, success, failed){
        this.GetByQQID(id, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetByQQIDVMImages(id:string, api:string, success, failed){
        this.GetByQQIDVM(id, function(models){
          this.GetImagesByList(models, api, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetByID(id:string, qqid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QQAGetByID?id="+id+"&qqid="+qqid, this.headers, success.bind(this), failed.bind(this));
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
    FindIndexByDesc(desc:string, array:QuizQuestionAnswerVM[], success){
        success(array.findIndex(x=>x.Description == desc));
    }
    FindIndexByID(id:string, array:QuizQuestionAnswerVM[], success){
        success(array.findIndex(x=>x.ID == id));
    }
    RemoveItem(item:QuizQuestionAnswerVM, list:QuizQuestionAnswerVM[], success){
        this.FindIndexByDesc(item.Description, list, function(index){
            list.splice(index, 1);
            success(list);
        }.bind(this))
    }
    RemoveByList(data:QuizQuestionAnswerVM[], qqid:string, success, failed){
        var index=0;
        if(data.length>0){
            data.forEach(el=>{
                this.Remove(el.ID, qqid, function(){
                  index++;
                  if(index==data.length){
                    success();
                  }
                }.bind(this), failed.bind(this))
              })
        }else{
            success();
        }
    }
    InsertList(list:QuizQuestionAnswerVM[], qqid:string, api:string, success, failed){
        var index=0;
        list.forEach(el=>{
            //if no id then insert
            if(el.isNew){
                if(el.Images.length > 0){
                    //insert images for choices
                    this.gdS.InsertByList(el.Images, api, function(){}, failed.bind(this))
                }
                this.InsertNew(el, qqid, function(){
                    index++;
                    if(index==list.length){
                        success(list);
                    }
                }.bind(this), failed.bind(this))
            }else{
                index++;
                if(index==list.length){
                    success(list);
                }
            }
        })
    }
    InsertNew(model:QuizQuestionAnswerVM, qqid:string, success, failed){
        this.Insert(model.ID, model.Description, ""+model.isCorrect, qqid, success.bind(this), failed.bind(this))
    }
    InsertImageGroup(imageLinkID:string, oid:string, api:string, order:number, success, failed){
        this.gdS.InsertNew(imageLinkID, oid, api, order, success.bind(this), failed.bind(this))
    }
    GetImagesByList(data:QuizQuestionAnswerVM[], api:string, success, failed){
        var index=0;
        data.forEach(el=>{
            this.GetImagesByQQAID(el.ID, api, function(models){
                this.gdS.GetImageLinkByGroupingData(models, api, function(vms){
                    el.Images=vms;
                    index++;
                    if(index==data.length){
                        success(data);
                    }
                }.bind(this), failed.bind(this))
            }.bind(this), failed.bind(this))
        })
    }
    GetImagesByQQAID(id:string, api:string, success, failed){
        this.gdS.GetByOIDVM(id, api, success.bind(this), failed.bind(this))
    }


}
