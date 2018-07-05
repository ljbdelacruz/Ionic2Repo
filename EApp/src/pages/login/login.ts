import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersViewModel, UserAccessLevelVM} from '../../services/apiServices/chronoidBaseApp/userManagement/model.model'
import {UsersServices} from '../../services/apiServices/chronoidBaseApp/userManagement/user.service'
import {GeneralService} from '../../services/general.service'
import {UserAccessLevelService} from '../../services/apiServices/chronoidBaseApp/userManagement/userAccessLevel.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import { SignUpPage } from '../sign-up/sign-up';
import {DashboardPage} from '../dashboard/dashboard'
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userInfo:UsersViewModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private uS:UsersServices, private gSer:GeneralService, private ualS:UserAccessLevelService,
  private gData:GlobalDataService){
    this.userInfo=new UsersViewModel();
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }
  LoginEvent(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    //authenticating user
    this.Authenticate(function(){
      load.dismiss();
    }.bind(this), function(message){
      load.dismiss();
      this.ShowAlert(message);
    }.bind(this))

  }
  Authenticate(success, failed){
    this.uS.Authenticate(this.userInfo.EmailAddress, this.userInfo.Password, function(data){
      //checking user access level
      this.gData.userInfo.set(data);
      this.CheckUserAccess(data.ID,function(models){
        if(models.length <=0){
          //create new user
          this.CreateAccessLevel(data.ID, function(model){
            this.gData.userAccessLevel=model;
            this.GotoDashboard(0);
            success();
          }.bind(this), failed.bind(this))
        }else{
          this.GetButtonsAccess(models, function(buttons){
            this.gSer.ShowAlertButtonsEvent("Which User Access will you select?", "", buttons)
            success();
          }.bind(this))
        }
      }.bind(this), failed.bind(this))

    }.bind(this), failed.bind(this))
  }
  CreateAccessLevel(uid, success, failed){
    var model:UserAccessLevelVM=new UserAccessLevelVM();
    model.UserID=uid;
    model.AccessLevelID="a2e2d83d-dd8d-4a66-bacf-94ad90344ca7";
    this.ualS.Insert(uid, "a2e2d83d-dd8d-4a66-bacf-94ad90344ca7", this.gData.applicationID,function(id){
      model.ID=id;
      success(model);
    }.bind(this), failed.bind(this))
  }
  CheckUserAccess(uid:string, success, failed){
    this.ualS.GetByUID(uid, this.gData.applicationID, function(data){
      this.ualS.MsToVMs(data, success.bind(this))
    }.bind(this), failed.bind(this))
  }

  GetButtonsAccess(data:UserAccessLevelVM[], success){
    var buttons:any[]=[];
    var index=0;
    data.forEach(el=>{
      if(el.AccessLevelID == 'a2e2d83d-dd8d-4a66-bacf-94ad90344ca7'){
        buttons.push({text:'User', role:'', handler:function(){this.GotoDashboard(0);}.bind(this)
        });
        index++;
      }else if(el.AccessLevelID == 'a1a346a4-49d4-4e7c-b757-88c5344e8455'){
        this.gData.userAccessLevel=el;
        buttons.push({text:'Attendant', role:'', handler:function(){this.GotoDashboard(1);}.bind(this)
        });
        index++;
      }else if(el.AccessLevelID == '0cd36708-4b9a-4d5f-bb92-3a5032a2c0a0'){
        this.gData.userAccessLevel=el;
        buttons.push({text:'Store Admin', role:'',  handler:function(){this.GotoDashboard(2);}.bind(this)});    
        index++; 
      }else if(el.AccessLevelID == 'c301524f-aa1c-433c-a953-2277c5cf8b44'){
        this.gData.userAccessLevel=el;
        buttons.push({text:'Driver', role:'', handler:function(){this.GotoDashboard(3);}.bind(this)}); 
        index++;   
      }
      if(index==data.length){
        success(buttons);
      }
    })
  }


  GotoSignUp(){
    this.navCtrl.push(SignUpPage);
  }
  ShowAlert(message){
    this.gSer.ShowAlert(message);
  }
  GotoDashboard(mode:number){
    this.navCtrl.push(DashboardPage, {"param":{mode:mode}})
  }

}
