import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreBranchVM } from '../../../services/apiServices/chronoidBaseApp/storeManagement/model.model';
import { StoreBranchService } from '../../../services/apiServices/chronoidBaseApp/storeManagement/storeBranch.service';
import {LocationStorageService} from '../../../services/apiServices/geoperson/locationTracking/locationTracking.service'
import {GeneralService} from '../../../services/general.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-modify-branch',
  templateUrl: 'modify-branch.html',
})
export class ModifyBranchPage {
  mode:number=0;
  //0-add 
  //1-edit
  storeID:string;
  branchInfo:StoreBranchVM;
  constructor(public navCtrl: NavController, public navParams: NavParams, private lsS:LocationStorageService,
  private gSer:GeneralService, private gData:GlobalDataService, private sbS:StoreBranchService) {
    var param=this.navParams.get("param");
    this.storeID=param.sid;
    if(this.mode == 1){
      this.branchInfo=param.data;
    }
  }
  ionViewDidLoad() {console.log('ionViewDidLoad ModifyBranchPage');}
  Close(){
    this.navCtrl.pop();
  }
  Insert(success, failed){
    this.gSer.GenerateID(function(id){
      this.sbS.Insert(id, this.storeID, this.gData.applicationID, id, this.branchInfo.Address, function(){
        //insert new branch location
      }.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
    this.sbS.InsertBranchLocation(id, this.storeID, this.gData.applicationID, this.gData.myLocation.longitude, 
    this.gData.myLocation.latitude, "", function(data){
      success
    }.bind(this), failed.bind(this))
  }
  LoadStoreAttendants(){
    
  }

}
