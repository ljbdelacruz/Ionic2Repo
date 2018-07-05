import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from '@ionic/storage'
//model
import {UsersViewModel} from '../../models/model.model'
//services
import {GeneralService} from '../../services/general.service';
import {UsersServices} from '../../services/controller/userService.controller'
import {GlobalDataService} from '../../services/singleton/globalData.data'
//pages
import {DashboardPage} from '../dashboard/dashboard';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDetail:UsersViewModel=new UsersViewModel();
  constructor(public navCtrl: NavController, private gService:GeneralService, private userS:UsersServices,
              private gdata:GlobalDataService, private storage:Storage) {
    this.CheckFirstTime();
  }
  CheckFirstTime(){
    this.storage.get("username").then(uname=>{
      if(uname!=null){
        this.storage.get("password").then(pass=>{
          this.userDetail.EmailAddress=uname;
          this.userDetail.Password=pass;
        })
      }
    })
  }

  LoginOnClick(){
    var load;
    this.gService.ShowLoadingCtrlInstance("Authenticating Please Wait...", function(obj){
      load=obj;
    });
    load.present();
    this.userS.Authenticate(this.userDetail, function(data){
      console.log(data);
      this.gdata.userLoginInfo.setVM(data.data);
      this.userS.GetByUID(data.data.ID, function(resp){
        this.gdata.vloggerDescription.set(resp.data);
      }.bind(this), function(resp){
        console.log(resp);
      }.bind(this));
      load.dismiss();
      this.navCtrl.push(DashboardPage);
      this.storage.set("username", this.userDetail.EmailAddress);
      this.storage.set("password", this.userDetail.Password);
    }.bind(this),function(data){
      this.gService.ShowAlert(data.message);
      load.dismiss();
    }.bind(this))
  }


}
