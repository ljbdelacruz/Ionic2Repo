import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard'
import {SuperAdminPage} from '../super-admin/super-admin'
import { UsersViewModel, UserSettingsVM } from '../../model/model.model';
import {GeneralService} from '../../services/general.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {UserSettingsFunction} from '../../services/function/userSettings.function';
import {ItemCategoryFunction} from '../../services/function/itemCategory.function'
import {MyFacebookService} from '../../services/apiServices/facebookServices/facebook.service'
import {UserFunction} from '../../services/function/user.function'
import {LocationStorageService} from '../../services/apiServices/locationTracking/locationStorage.service'
import {SignUpPage} from '../sign-up/sign-up'
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userInfo:UsersViewModel=new UsersViewModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, private gSer:GeneralService,
  private gData:GlobalDataService, private userSF:UserSettingsFunction, private itemCF:ItemCategoryFunction,
  private mfS:MyFacebookService, private userF:UserFunction, private lsS:LocationStorageService) {
    //get this user current location
    this.lsS.GetCurrentUserLocation(function(resp){
      this.gData.myLocation.set(resp.Longitude, resp.Latitude);
    }.bind(this), function(resp){}.bind(this))
    this.LoadCategories();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  LoginEvent(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Logging Please wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.userF.Authenticate(this.userInfo.EmailAddress, this.userInfo.Password, 
    function(data){
      this.gData.userLoginInfo=data;
      this.CheckUserSettings(data.ID, function(vm:UserSettingsVM){
        if(vm.AccessLevelID == "a2e2d83d-dd8d-4a66-bacf-94ad90344ca7"){
          //user access
          this.navCtrl.push(DashboardPage);
          load.dismiss();
        }else if(vm.AccessLevelID=="3c35cccc-d48d-4721-9283-d58faeac6cc1"){
          //admin access
          this.navCtrl.push(SuperAdminPage);
          load.dismiss();
        }
      }.bind(this), function(){});
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
      load.dismiss();
    }.bind(this))
  }
  CheckUserSettings(id:string, success, failed){
    this.userSF.CheckUserSettings(id, function(data){
      success(data);
    }.bind(this), function(message){
      failed(message);
    }.bind(this))
  }
  LoadCategories(){
    this.itemCF.GetAll(function(resp){
      this.gData.categories=resp;
    }.bind(this), function(message){
      console.log(message);
      this.gSer.ShowAlert("Loading Categories error");
    }.bind(this))
  }
  profileImage:string="";
  name:string="";
  LoginAsFacebook(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Authenticating Facebook pleas wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.mfS.Authenticate(function(data){
      this.name=data.Firstname+" "+data.Lastname;
      this.profileImage=data.ProfileImage;
      if(data.EmailAddress.length>0){
        this.userF.CheckIfEmailIsAlreadyUsed(data.EmailAddress, function(value){
          //if value==true then login immediately using that email/password
          //else then create the user first then sign in
          this.userInfo.setFB(data);
          if(!value){
            this.CreateUser(function(){
              load.dismiss();
            }.bind(this), function(){
              load.dismiss();
            }.bind(this));
          }else{
            this.LoginEvent();       
            load.dismiss();     
          }
        }.bind(this), function(message){
          this.gSer(message);
          load.dismiss();
        }.bind(this))
      }
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
      load.dismiss();
    }.bind(this))
  }
  ClearFacebookLogin(){
  }
  CreateUser(success, failed){
    this.userF.CreateNewUser(this.userInfo, this.gData.geoMarketAPI, function(){
      this.LoginEvent();
      success();
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
      failed();
    }.bind(this))
  }
  GotoSignUp(){
    this.navCtrl.push(SignUpPage);
  }


}
