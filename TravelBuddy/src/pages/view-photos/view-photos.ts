import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VlogSegmentDescriptionMedia} from '../../models/model.model'
@IonicPage()
@Component({
  selector: 'page-view-photos',
  templateUrl: 'view-photos.html',
})
export class ViewPhotosPage {
  photos:VlogSegmentDescriptionMedia[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.photos=this.navParams.get("params").data;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPhotosPage');
  }
  Close(){
    this.navCtrl.pop();
  }

}
