import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersServices} from '../../services/apiServices/chronoidBaseApp/userManagement/user.service'
import {UserAccessLevelService} from '../../services/apiServices/chronoidBaseApp/userManagement/userAccessLevel.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import { UsersViewModel } from '../../services/apiServices/chronoidBaseApp/userManagement/model.model';
import {DashboardPage} from '../dashboard/dashboard'
import {SignUpPage} from '../sign-up/sign-up'
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userInput:UsersViewModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userS:UsersServices, private uaccesslS:UserAccessLevelService, 
  private gData:GlobalDataService, private gSer:GeneralService) {
    this.userInput=new UsersViewModel();
  }
  Login(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Logging in please wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.userS.Authenticate(this.userInput.EmailAddress, this.userInput.Password, 
    function(data){
      load.dismiss();
      this.gData.userInfo.set(data);
      this.CheckAccessLevel(this.gData.userInfo.ID, function(){
        this.navCtrl.push(DashboardPage);
      }.bind(this));
    }.bind(this), function(message){
      load.dismiss();
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  CheckAccessLevel(uid:string, success){
    this.uaccesslS.GetByUserID(uid, this.gData.applicationID, function(data){
      //check if no ual then create one
      if(data!=null){
        this.gData.userAccessLevel.set(data);
        success();
      }else{
        this.CreateAccessLevel(success.bind(this));
      }
    }.bind(this), function(message){
      console.log(message);
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  CreateAccessLevel(success){
    this.uaccesslS.Insert(this.gData.userInfo.ID, "a2e2d83d-dd8d-4a66-bacf-94ad90344ca7", this.gData.applicationID, function(resp){
      success();
    }.bind(this), this.gSer.ShowAlert.bind(this))
  }
  GotoSignup(){
    this.navCtrl.push(SignUpPage);
  }
}
