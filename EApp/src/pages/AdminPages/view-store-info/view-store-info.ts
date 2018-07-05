import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyStoreVM } from '../../../services/apiServices/chronoidBaseApp/storeManagement/model.model';
import {BranchlistPage} from '../branchlist/branchlist'
@IonicPage()
@Component({
  selector: 'page-view-store-info',
  templateUrl: 'view-store-info.html',
})
export class ViewStoreInfoPage {
  mode:number=0;
  //0-edit, add branches admin page
  //1-user view store info
  storeInfo:MyStoreVM;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var param=this.navParams.get("param");
    this.mode=param.mode;
    if(this.mode==0){
      //admin page
      this.storeInfo=param.data;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewStoreInfoPage');
  }
  GoBranch(){
    this.navCtrl.push(BranchlistPage, {"param":{}});
  }

}
