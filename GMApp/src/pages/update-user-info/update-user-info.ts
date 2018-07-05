import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalDataService} from '../../services/singleton/global.data'
import {UsersViewModel, ItemImageVM} from '../../model/model.model'
import {UploadersFunction} from '../../services/apiServices/Uploaders/uploaders.function'
import {UserFunction} from '../../services/function/user.function'
import {GeneralService} from '../../services/general.service'
import {UploadersService} from '../../services/apiServices/Uploaders/uploaders.service'
@IonicPage()
@Component({
  selector: 'page-update-user-info',
  templateUrl: 'update-user-info.html',
})
export class UpdateUserInfoPage {
  tempImage:string="";
  userInfo:UsersViewModel;
  mode:number
  //1-user login info modify
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService,
  private uploadersF:UploadersFunction, private userF:UserFunction, private gSer:GeneralService, private uploaderS:UploadersService) {
    this.tempImage=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    var param=this.navParams.get("param");
    this.mode=param.mode;
    if(this.mode==1){
      this.userInfo=this.gData.userLoginInfo;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateUserInfoPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  isUploadingProfileImage:boolean=false;
  UploadImage(){
    this.isUploadingProfileImage=true;
    this.uploaderS.UploadImage("GEO/Profile", function(path){
      var imgPath=this.gData.uploadURL+path;
      this.userF.UpdateProfileImage(this.userInfo.ID, imgPath, function(){
        this.userInfo.ProfileImage=imgPath;
        this.gSer.ShowAlert("Profile Image Updated!");      
        this.isUploadingProfileImage=false;
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
        this.isUploadingProfileImage=false;
      }.bind(this))
    }.bind(this), function(){
      this.isUploadingProfileImage=false;
    }.bind(this))
  }

  isUpdatingContactNumber:boolean=false;
  UpdateContactNumber(){
    this.gSer.ShowAlertEvent("Update Contact Number?", "This number will be used inorder for the ad inquirer to contact you  is this ok?", "Yes", "No", 
    function(){
      this.isUpdatingContactNumber=true;
      this.userF.UpdateContactNumber(this.userInfo.ID, this.userInfo.ContactNumber, 
        function(){
          this.isUpdatingContactNumber=false;
          this.gSer.presentToast("Contact Number Updated!", 1000, "bottom", function(){});
        }.bind(this), function(message){
          this.isUpdatingContactNumber=false;
          this.gSer.ShowAlert(message);
        }.bind(this))    
    }.bind(this), function(){
      this.isUpdatingContactNumber=false;
    }.bind(this))
  }

}
