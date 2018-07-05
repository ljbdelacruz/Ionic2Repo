import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeneralService} from '../../services/general.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {UsersViewModel} from '../../services/apiServices/chronoidBaseApp/userManagement/model.model'
import {UsersServices} from '../../services/apiServices/chronoidBaseApp/userManagement/user.service'
import {UserAccessLevelService} from '../../services/apiServices/chronoidBaseApp/userManagement/userAccessLevel.service'
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  userInfo:UsersViewModel=new UsersViewModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, private userS:UsersServices, private gSer:GeneralService,
  private gData:GlobalDataService, private ualS:UserAccessLevelService) {
    this.userInfo.location=this.gData.myLocation;
  }
  ionViewDidLoad() {}
  InsertUserAccessLevel(uid:string,success, failed){
    this.ualS.Insert(uid, "a2e2d83d-dd8d-4a66-bacf-94ad90344ca7", this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  CreateUserAcct(user:UsersViewModel,success, failed){
    //success(id)
    this.userS.CreateUser(user, this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  Close(){
    this.navCtrl.pop();
  }
  Success(){
    this.gSer.ShowAlert("User Accout Created!");
    this.Close();
  }
  isProcessing:boolean=false;
  CreateUser(){
    console.log("Creating User")
    this.isProcessing=true;
    this.Validate(function(){
      this.CreateUserAcct(this.userInfo, function(uid){
        this.InsertUserAccessLevel(uid, function(){
          this.isProcessing=false;
          this.Success();
        }.bind(this), function(message){}.bind(this))
      }.bind(this), function(message){}.bind(this))
    }.bind(this))
  }
  validations:boolean[]=[false, false, false, false, false, false, false];
  Validate(success){
    if(this.userInfo.EmailAddress.length <= 0){
      this.validations[0]=true;
      this.isProcessing=false;
    }else{
      this.validations[0]=false;
      if(this.userInfo.Password.length <= 0 || (this.userInfo.Password != this.userInfo.Repassword)){
        this.validations[1]=true;
        this.isProcessing=false;
      }else{
        this.validations[1]=false;
        if(this.userInfo.Firstname.length <= 0){
          this.validations[2]=true;
          this.isProcessing=false;
        }else{
          this.validations[2]=false;
          if(this.userInfo.Lastname.length <= 0){
            this.validations[3]=true;
            this.isProcessing=false;
          }else{
            this.validations[3]=false;
            if(this.userInfo.Middlename.length <= 0){
              this.validations[4]=true;
              this.isProcessing=false;
            }else{
              this.validations[4]=false;
              if(this.userInfo.Address.length <= 0){
                this.validations[5]=true;
                this.isProcessing=false;
              }else{
                this.validations[5]=false;
                if(this.userInfo.ContactNumber.length <= 0){
                  this.validations[6]=true;
                  this.isProcessing=false;
                }else{
                  this.validations[6]=false;
                  success();
                }
              }
            }
          }
        }
      }
    }
  }

}
