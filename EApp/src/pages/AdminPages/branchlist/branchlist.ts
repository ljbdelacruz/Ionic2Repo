import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyStoreVM, StoreBranchVM } from '../../../services/apiServices/chronoidBaseApp/storeManagement/model.model';
import {StoreBranchService} from '../../../services/apiServices/chronoidBaseApp/storeManagement/storeBranch.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-branchlist',
  templateUrl: 'branchlist.html',
})
export class BranchlistPage {
  mode:number=0;
  //0-admin page mode
  //1-user finding nearest branch
  storeInfo:MyStoreVM;
  branches:StoreBranchVM[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sbS:StoreBranchService,
  private gData:GlobalDataService) {
    var param=this.navParams.get("param");
    this.mode=param.mode;
    if(this.mode==0){
      this.storeInfo=param.data;
    }
  }
  LoadBranches(success, failed){
    this.sbS.GetBySIDAID(this.storeInfo.ID, this.gData.applicationID, function(data){
      this.sbS.MsToVMs(data, function(models){
        this.branches=models;
      }.bind(this))
    }.bind(this), failed.bind(this))
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad BranchlistPage');
  }
  Close(){
    this.navCtrl.pop();
  }

}
