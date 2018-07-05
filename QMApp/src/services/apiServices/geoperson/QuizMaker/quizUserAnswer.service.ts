import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data';
import { QuizUserAnswerVM } from './model.model';
import {GeneralService} from '../../../general.service'
@Injectable()
export class QuizUserAnswerService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService, private gSer:GeneralService){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, qtid:string, qqid:string, qaid:string, oa:string, point:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        body.append("qqid", qqid);
        body.append("qaid", qaid);
        body.append("oa", oa);
        body.append("point",point);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QUAInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertEss(id:string, qtid:string, qqid:string, oa:string, point:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        body.append("qqid", qqid);
        body.append("oa", oa);
        body.append("point",point);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QUAInsertEss", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, qtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QUARemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, qtid:string, point:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        body.append("point", point);
        this.rs.SimplifyPost(this.gser.geoURL+"QuizMaker/QUAUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByQTID(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QUAGetByQTID?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    GetByQTIDVM(id:string, success, failed){
        this.GetByQTID(id, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetByQQID(id:string, qqid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QUAGetByQQID?id="+id+"&qqid="+qqid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByQQIDQAID(id:string, qid:string, success, failed){
        this.rs.SimplifyGet(this.gser.geoURL+"QuizMaker/QUAGetByQQIDQAID?id="+id+"&qid="+qid, this.headers, success.bind(this), failed.bind(this))
    }
    MToVM(object, success){
        var item=new QuizUserAnswerVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizUserAnswerVM[]=[];
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

    InsertNew(qqaid, success, failed){
        this.gSer.GenerateID(function(id){}.bind(this), failed.bind(this))
    }


}
