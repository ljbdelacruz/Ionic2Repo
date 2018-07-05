import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserReviewFunction} from '../../services/function/userReview.function'
import {UserReviewVM} from '../../model/model.model'
import {ModifyReviewPage} from '../modify-review/modify-review'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
@IonicPage()
@Component({
  selector: 'page-view-user-reivew-content',
  templateUrl: 'view-user-reivew-content.html',
})
export class ViewUserReivewContentPage {
  noImagePath:string;
  viewerID:string;
  userID:string;
  myReview:UserReviewVM=new UserReviewVM();
  constructor(public navCtrl: NavController, public navParams: NavParams, public userRF:UserReviewFunction,
  private gData:GlobalDataService, private gSer:GeneralService) {
    this.noImagePath=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    var param=this.navParams.get("param");
    this.userID=param.uid;
    this.viewerID=this.gData.userLoginInfo.ID;
    this.LoadReview();
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserReivewContentPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  Reviews:UserReviewVM[]=[];
  isReviewLoading:boolean=true;
  LoadReview(){
    this.userRF.GetByUserID(this.userID, function(list){
      this.Reviews=list;
      this.isReviewLoading=false;
      this.GetUserReview();
    }.bind(this), function(message){
      console.log(message);
    }.bind(this))
  }
  userReviewInfo:UserReviewVM=new UserReviewVM();
  AddReviewEvent(){
    if(this.myReview.ID.length<=0){
      this.userReviewInfo.SenderID=this.gData.userLoginInfo.ID;
      this.userReviewInfo.UserID=this.userID;
      this.userReviewInfo.API=this.gData.geoMarketAPI;
      this.navCtrl.push(ModifyReviewPage, {"param":{mode:1, userReview:this.userReviewInfo, successEvent:this.SuccessAddReview.bind(this)}});
    }else{
      this.gSer.ShowAlertEvent("Delete the current review you created on this user?", "Before adding new review you must remove the current review you created of this user", 
      "Yes", "No", function(){
        //remove the item
        this.RemoveReview(this.myReview.ID);
      }.bind(this), function(){}.bind(this))      
    }
  }
  SuccessAddReview(id){
    this.userRF.GetByID(id, this.gData.geoMarketAPI, function(data){
      this.userRF.StackArray(data, this.Reviews, function(list){
        this.Reviews=list;
      }.bind(this))
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  RemoveReview(id:string){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Removing review please wait...", function(obj){
      load=obj;
    }.bind(this))
    this.gSer.ShowAlertEvent("Do you want to remove this review?", "", "Yes", "No", function(){
      load.present();
      this.userRF.Remove(id, function(){
        this.userRF.RemoveByID(this.Reviews, id, function(list){
          this.Reviews=list;
          this.gSer.ShowAlert("Review Removed!");
        }.bind(this))
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
      load.dismiss();
    }.bind(this), function(){})
  }
  GetUserReview(){
    this.Reviews.forEach(el=>{
      if(el.SenderInfo.ID == this.gData.userLoginInfo.ID){
        this.myReview=el;
      }
    })
  }


}
