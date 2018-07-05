import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalDataService} from '../../services/singleton/global.data'
import {ReportClaimsService} from '../../services/apiServices/chronoidBase/ReportSystem/reportClaims.service'
import {GeneralService} from '../../services/general.service'
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  userIDReported:string="";
  reason:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService, private rcS:ReportClaimsService, private gSer:GeneralService) {
    var param=this.navParams.get("params");
    this.userIDReported=param.uid;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  InsertReport(){
    if(this.reason.length > 10){
      var load;
      this.gSer.ShowLoadingCtrlInstance("Creating Report Please Wait...", function(obj){
        load=obj;
      }.bind(this))
        this.gSer.ShowAlertEvent("Do you want to Issue this report to admin?", "Issued report will be evaluated is found false the account that reported will will have serious consequence is this ok?",
      "I Agree", "Disagree", function(){
        load.present();
        this.rcS.Insert(this.userIDReported, this.gData.userLoginInfo.ID, this.reason, function(resp){
          this.gSer.ShowAlert("Report Created!");
          load.dismiss();
          this.Close();
        }.bind(this), function(resp){
          load.dismiss();
          this.gSer.ShowAlert(resp);
        }.bind(this))
      }.bind(this), function(){
        load.dismiss();
      }.bind(this))  
    }else{
      this.gSer.ShowAlert("Please make your reason elaborate as possible so that we will be able to properly evaluate the situation thank you");
    }

  }

}
