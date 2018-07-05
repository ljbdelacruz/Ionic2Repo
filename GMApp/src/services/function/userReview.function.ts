import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {UserReviewService} from '../controller/81/userReview.service'
//this one is for requesting data from request database
//view model
import {UserReviewVM} from '../../model/model.model'
import {UserFunction} from './user.function'

@Injectable()
export class UserReviewFunction{
    constructor(private gser:GlobalDataService, private userRS:UserReviewService, public userF:UserFunction){
    }
    GetByID(id:string, api:string, success, failed){
        this.userRS.GetByID(id, api, function(resp){
            var temp=new UserReviewVM();
            temp.set(resp.data);
            this.userF.GetByID(resp.data.SenderID, function(sender){
                temp.SenderInfo.set(sender);
                success(temp);
            }.bind(this), function(message){
                failed(message);
            }.bind(this))
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    GetByUserID(id:string, success, failed){
        var list:UserReviewVM[]=[];
        this.userRS.GetByUserID(id, function(resp){
            if(resp.data.length>0){
                resp.data.forEach(element => {
                    var temp=new UserReviewVM();
                    temp.set(element);
                    this.userF.GetByID(element.SenderID, function(sender){
                        temp.SenderInfo.set(sender);
                        list.push(temp); 
                        if(list.length==resp.data.length){
                            success(list);
                        }
                    }.bind(this), function(message){
                        failed(message);
                    }.bind(this))
                });
            }else{
                success([]);
            }
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    CalculateReview(id:string, api:string, success, failed){
        this.userRS.CalculateUserReviews(id, api, function(resp){
            success(resp.data);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }

    Insert(comment:string, uid:string, sid:string, api:string, stars:number, success, failed){
        this.userRS.Insert(comment, uid, sid, api, stars, function(resp){
            success(resp.data);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Remove(id:string, success, failed){
        this.userRS.Remove(id, function(resp){
            success();
        }.bind(this),function(resp){
            failed(resp.message);
        }.bind(this))
    }
    StackArray(item:UserReviewVM, items:UserReviewVM[], success){
        var temp:UserReviewVM[]=[];
        temp.push(item);
        items.forEach(element => {
            temp.push(element); 
        });
        success(temp);
    }
    FindByID(items:UserReviewVM[], id:string, success){
        success(items.findIndex(x=>x.ID==id));
    }
    RemoveByID(items:UserReviewVM[], id:string, success){
        var index=items.findIndex(x=>x.ID==id);
        items.splice(index, 1);
        success(items);
    }

}
