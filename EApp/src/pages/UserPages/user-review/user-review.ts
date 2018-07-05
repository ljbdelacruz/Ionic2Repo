import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserReviewVM } from '../../../services/apiServices/geoperson/userReview/model.model';
import {GlobalDataService} from '../../../services/singleton/global.data'
import { UserReviewService } from '../../../services/apiServices/geoperson/userReview/userReview.service';
import {GeneralService} from '../../../services/general.service'
import {UsersServices} from '../../../services/apiServices/chronoidBaseApp/userManagement/user.service'
@IonicPage()
@Component({
  selector: 'page-user-review',
  templateUrl: 'user-review.html',
})
export class UserReviewPage {
  mode:number=0;
  //0-admin owner
  //1-another user viewing the owner reviews
  reviews:UserReviewVM[];
  uid:string;
  isLoading:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService,
  private urS:UserReviewService, private gSer:GeneralService, private uS:UsersServices) {
    this.reviews=[];
    var param=this.navParams.get("param");
    this.mode=param.mode;
    //user id reviews
    this.uid=param.uid;
    this.ReloadData();
  }
  startLoading(){
    this.isLoading=true;
  }
  ReloadData(){
      this.startLoading();
      this.LoadReviews(function(models){
        this.reviews=models;
        this.GetUserReviewMade();
        this.LoadUserInfo(this.Success.bind(this), this.Failed.bind(this))
      }.bind(this), this.Failed.bind(this))
  }
  Success(){
    this.userReviewModel.empty();
    this.isLoading=false;
  }
  Failed(message){
    this.isLoading=false;
    this.gSer.ShowAlert(message);
  }
  ionViewDidLoad(){
  }
  Close(){
    this.navCtrl.pop();
  }
  LoadReviews(success, failed){
    this.urS.GetByUserID(this.uid, this.gData.applicationID, function(data){
      this.urS.MsToVMs(data, success.bind(this))
    }.bind(this), failed.bind(this))
  }
  LoadUserInfo(success, failed){
    if(this.reviews.length>0){
      var index=0;
      this.reviews.forEach(el=>{
        this.uS.GetByID(el.SenderID, function(data){
          this.uS.MToVM(data, function(model){
            el.UserInfo=model;
            index++;
            if(index<=this.reviews.length){
              success();
            }
          }.bind(this))
        }.bind(this), failed.bind(this))
      })
    }else{
      success();
    }
  }
  userReviewModel:UserReviewVM=new UserReviewVM();
  //inserting reviews
  InsertNewReview(success, failed){
    this.urS.Insert(this.userReviewModel.Comment, this.uid, this.gData.userInfo.ID, this.gData.applicationID, 
    this.userReviewModel.Stars, success.bind(this), failed.bind(this))
  }
  //get userReviewMade
  userReviewMade:UserReviewVM=new UserReviewVM();
  GetUserReviewMade(){
    this.reviews.forEach(el=>{
      if(el.SenderID == this.gData.userInfo.ID){
        this.userReviewMade=el;
      }
    })
  }
  Remove(success, failed){
    this.urS.Remove(this.userReviewMade.ID, this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  CreateReviewEvent(){
    //check if user already made a review
    if(this.userReviewMade.ID.length <= 0){
        this.startLoading();
        this.InsertNewReview(function(){
          this.Success();
          this.ReloadData();
        }.bind(this), this.Failed.bind(this))
    }else{
    //else remove current review and insert new review
      this.gSer.ShowAlertEvent("Do you want to Remove Current Review?", "it will replace the current review you had made for this user is this ok?",
      "Yes", "No", function(){
          this.startLoading();
          this.Remove(function(){
            //then insert new review
            this.InsertNewReview(function(){
              this.Success();
              this.ReloadData();
            }.bind(this), this.Failed.bind(this))
          }.bind(this), this.Failed.bind(this))
        //remove review
      }.bind(this), function(){})
    }
  }


}
