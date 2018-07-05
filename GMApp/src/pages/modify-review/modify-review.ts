import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserReviewVM} from '../../model/model.model'
import {UserReviewFunction} from '../../services/function/userReview.function'
import {GeneralService} from '../../services/general.service'
//add or edit review
@IonicPage()
@Component({
  selector: 'page-modify-review',
  templateUrl: 'modify-review.html',
})
export class ModifyReviewPage {
  userReviewInfo:UserReviewVM=new UserReviewVM();
  mode:number=1;
  starCount:number=1;
  successEvent:any;
  //1-add, 2-edit
  constructor(public navCtrl: NavController, public navParams: NavParams, private userReviewF:UserReviewFunction,
  private gSer:GeneralService) {
    var param=this.navParams.get("param");
    this.mode=param.mode;
    this.userReviewInfo=param.userReview;
    this.successEvent=param.successEvent;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyReviewPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  SaveChanges(){
    if(this.mode==1){
      this.userReviewF.Insert(this.userReviewInfo.Comment, this.userReviewInfo.UserID, this.userReviewInfo.SenderID, this.userReviewInfo.API, this.starCount, function(id){
        this.gSer.ShowAlert("User Review Created!");
        this.successEvent(id);
        this.Close();
      }.bind(this), 
      function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
      //add
    }else{
      //update
    }
  }

}
