import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VloggerDescriptionViewModel} from '../../models/model.model'
//services
import {GeneralService} from '../../services/general.service'
import {UsersServices} from '../../services/controller/userService.controller'
@IonicPage()
@Component({
  selector: 'page-setup-profile',
  templateUrl: 'setup-profile.html',
})
export class SetupProfilePage {
  vlogger:VloggerDescriptionViewModel=new VloggerDescriptionViewModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, private userS:UsersServices,
              private genS:GeneralService) {    
    this.vlogger.UID=this.navParams.get("param").data;
  }
  ionViewDidLoad() {
  }
  //save profile
  SaveProfile(){
    var load:any;
    this.genS.ShowLoadingCtrlInstance("Saving profile please wait...", function(obj){
      load=obj;
    }.bind(this));
    load.present();
    this.userS.UpdateProfile(this.vlogger.UID, this.vlogger.Name, this.vlogger.profileImage, 
    function(resp){
      load.dismiss();
      this.navCtrl.pop();
    }.bind(this), function(resp){
      this.genS.ShowAlert(resp.message);
      load.dismiss();
    }.bind(this))
  }

}
