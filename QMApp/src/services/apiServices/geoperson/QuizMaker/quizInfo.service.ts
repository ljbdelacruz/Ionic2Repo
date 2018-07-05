import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizInfoVM } from './model.model';
@Injectable()
export class QuizInfoService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(name:string, oid:string, aid:string, qc:string, status:string, success, failed){
        if(qc.length<=0){
            failed("Please Wait until Quiz code is generated");
        }else{
            var body=new FormData();
            body.append("name", name);
            body.append("oid", oid);
            body.append("aid", aid);
            body.append("qc", qc);
            body.append("status", status);
            this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QIInsert", this.headers, body, success.bind(this), failed.bind(this));
        }
    }
    UpdateQuizStats(id:string, oid:string, qs:string, success, failed){
        var body=new FormData();
        body.append("id", id)
        body.append("oid", oid)
        body.append("stats", qs)
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QIUpdateQuizStats", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, qc:string, name:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qc", qc);
        body.append("name", name);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QIUpdate", this.headers, body,success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QIRemove", this.headers,body, success.bind(this), failed.bind(this));
    }
    GetID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QIGetID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByQC(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QIGetByQC?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByID(id:string, oid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QIGetByID?id="+id+"&oid="+oid+"&api="+aid, this.headers, success.bind(this), failed.bind(this));
    }
    GetByOID(oid:string, api:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QIGetByOID?oid="+oid+"&api="+api, this.headers, success.bind(this), failed.bind(this));
    }
    MToVM(object, success){
        var item=new QuizInfoVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizInfoVM[]=[];
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
            success(nlist)
        }
    }
    Segregate(list:QuizInfoVM[], success, failed){
        var questionaire:QuizInfoVM[]=[];
        var survey:QuizInfoVM[]=[];
        var index=0;
        list.forEach(x=>{
            if(x.Status == "419d67aa-4436-4811-a570-a716e7da490f"){
                questionaire.push(x);
            }else if(x.Status == "a69d7206-4bd6-4b79-9460-e38ed713efe0"){
                survey.push(x);
            }
            index++;
            if(index==list.length){
                success(questionaire, survey);
            }
        })
    }
}
