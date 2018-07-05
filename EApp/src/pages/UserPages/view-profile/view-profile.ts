import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersServices} from '../../../services/apiServices/chronoidBaseApp/userManagement/user.service'
import { UsersViewModel } from '../../../services/apiServices/chronoidBaseApp/userManagement/model.model';
import {GeneralService} from '../../../services/general.service'
import {UserReviewPage} from '../user-review/user-review'
@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  userInfo:UsersViewModel;
  isAdmin:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private uS:UsersServices, private gSer:GeneralService) {
    this.userInfo=new UsersViewModel();
    var param=this.navParams.get("param");
    this.isAdmin=param.isAdmin;
    this.LoadUserInfo(param.uid, function(model){
      this.userInfo=model;
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }
  LoadUserInfo(uid:string, success, failed){
    this.uS.GetByID(uid, function(data){
      this.uS.MToVM(data, success.bind(this))
    }.bind(this), failed.bind(this))
  }
  Close(){
    this.navCtrl.pop();
  }
  ViewUserReview(){
    this.navCtrl.push(UserReviewPage, {"param":{mode:this.isAdmin?0:1, uid:this.userInfo.ID}});
  }
  TestViewReview(){
    this.navCtrl.push(UserReviewPage, {"param":{mode:1, uid:'7a60e757-b5e3-4935-a38f-ccd2c2aa91b0'}});
  }

}
