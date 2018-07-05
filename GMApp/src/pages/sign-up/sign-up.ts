import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersViewModel} from '../../model/model.model'
import {UserFunction} from '../../services/function/user.function'
import {GeneralService} from '../../services/general.service'
import {UploadersService} from '../../services/apiServices/Uploaders/uploaders.service'
import {GlobalDataService} from '../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  userInfo:UsersViewModel=new UsersViewModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, private userF:UserFunction, private gSer:GeneralService,
  private gData:GlobalDataService) {
    this.userInfo.location=this.gData.myLocation;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  isProcessing:boolean=false;
  CreateUser(){
    this.isProcessing=true;
    this.Validate(function(){
      this.userF.CreateNewUser(this.userInfo, this.gData.geoMarketAPI, function(){
        this.isProcessing=false;
        this.gSer.ShowAlert("User created!");
        this.Close();
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
        this.isProcessing=false;
      }.bind(this))
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
