import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VlogSegmentLocationVM, PositionViewModel } from '../../models/model.model';
import {GeneralService} from '../../services/general.service'
@IonicPage()
@Component({
  selector: 'page-help-navigate',
  templateUrl: 'help-navigate.html',
})
export class HelpNavigatePage {
  position:VlogSegmentLocationVM=new VlogSegmentLocationVM();
  myPosition:PositionViewModel=new PositionViewModel(0,0);
  myLocationObserve:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private genS:GeneralService) {
    this.position=this.navParams.get("params").data;
    console.log(this.position);
    //get current user location
    this.FindLocation();
    this.myLocationObserve= this.genS.ObservableIntervalSubscribe(3000, function(){
      this.FindLocation();
    }.bind(this))
  }
  ionViewDidLoad() {

  }
  ionViewWillLeave() {
    this.myLocationObserve.unsubscribe();
  }
  Close(){
    this.navCtrl.pop();
  }

  //findlocation
  FindLocation(){
    this.genS.GetCurrentLocation(function(resp){
      this.myPosition.latitude=resp.lat;
      this.myPosition.longitude=resp.long;
      console.log("Observe");
    }.bind(this), function(resp){}.bind(this))
  }

}
