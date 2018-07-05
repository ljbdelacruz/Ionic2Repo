import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import {VlogSegmentDescriptionType} from '../../../models/model.model'
import {VlogSegmentTypeService} from '../../../services/controller/vlogSegmentType.service'
import {GlobalDataService} from '../../../services/singleton/globalData.data'
import {GeneralService} from '../../../services/general.service'
@IonicPage()
@Component({
  selector: 'page-choose-components',
  templateUrl: 'choose-components.html',
})
export class ChooseComponentsPage {
  items:VlogSegmentDescriptionType[]=[];
  event:any;
  constructor(public navParams: NavParams, private viewCtrl:ViewController, private vlogSegmentTypeS:VlogSegmentTypeService,
              private gData:GlobalDataService, private gSer:GeneralService) {
    this.event=this.navParams.get("invoke").event;
    this.LoadSegmentTypes();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseComponentsPage');
  }
  ItemSelected(item){
    this.event(item);
    this.viewCtrl.dismiss();
  }
  LoadSegmentTypes(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Getting types please wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.items=[];
    this.gData.vlogSegmentType=[];
    if(this.gData.vlogSegmentType.length <= 0){
      this.vlogSegmentTypeS.Get(function(resp){
        resp.data.forEach(el => {
          this.items.push(new VlogSegmentDescriptionType(el.ID, el.Description));
          this.gData.vlogSegmentType.push(new VlogSegmentDescriptionType(el.ID, el.Description));
        });
        load.dismiss();
      }.bind(this), function(resp){
        load.dismiss();
      }.bind(this))
    }else{
      this.items=this.gData.vlogSegmentType;
    }
  }

}
