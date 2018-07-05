import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyStoreService} from '../../../services/apiServices/chronoidBaseApp/storeManagement/mystore.service'
import {SecurityCodeGeneratorService} from '../../../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import { MyStoreVM } from '../../../services/apiServices/chronoidBaseApp/storeManagement/model.model';
import {GlobalDataService} from '../../../services/singleton/global.data'
import {ImageLinkStorageService} from '../../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {GeneralService} from '../../../services/general.service'
@IonicPage()
@Component({
  selector: 'page-create-store',
  templateUrl: 'create-store.html',
})
export class CreateStorePage {
  uid:string;
  mode:number=0;
  //0-add
  //1-edit
  storeInfo:MyStoreVM=new MyStoreVM();
  constructor(public navCtrl: NavController, public navParams: NavParams, private msS:MyStoreService, private scgS:SecurityCodeGeneratorService,
  private gData:GlobalDataService, private ilsS:ImageLinkStorageService, private gSer:GeneralService){
    var param=this.navParams.get("param");
    this.mode=param.mode;
    this.uid=param.uid;
    if(this.mode==1){
      this.storeInfo=param.data;
    }else{
      this.GenerateID(function(id){
        this.storeInfo.ID=id;
      }.bind(this), this.Failed.bind(this))
    }
  }
  ionViewDidLoad() {}
  PopForm(){
    this.navCtrl.pop();
  }
  Close(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
    }.bind(this))
    this.gSer.ShowAlertEvent("Do you want to discard changes?", "", "Yes", "No", function(){
      load.present();
      this.DiscardChanges(function(){
        this.PopForm();
        load.dismiss();
      }.bind(this), function(message){
        load.dismiss();
        this.Failed(message);
      }.bind(this))
    }.bind(this), function(){})
  }
  SaveStore(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
    }.bind(this))
    this.gSer.ShowAlertEvent("Do you want to save this store?", "", "Yes", "No", function(){
      load.present();
      this.InsertStore(function(){
        load.dismiss();
        this.Failed("Store Added!");
        this.PopForm();
      }.bind(this), function(message){
        load.dismiss();
        this.Failed(message);
      }.bind(this))
    }.bind(this), function(){})
  }
  Failed(message){
    this.gSer.ShowAlert(message);
  }
  DiscardBGImage(success, failed){
    if(this.storeInfo.StoreBackgroundImageID.length > 0){
      this.RemoveLink(this.storeInfo.StoreBackgroundImageID, success.bind(this), failed.bind(this))
    }else{
      success();
    }
  }
  DiscardLogo(success, failed){
    if(this.storeInfo.StoreLogoID.length > 0){
      this.RemoveLink(this.storeInfo.StoreLogoID, success.bind(this), failed.bind(this))
    }else{
      success();
    }
  }
  DiscardChanges(success, failed){
    this.DiscardBGImage(function(){
      this.DiscardLogo(success.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
  }
  InsertStore(success, failed){
    this.msS.Insert(this.storeInfo.ID, this.uid, this.storeInfo.Name, this.gData.applicationID, this.storeInfo.StoreCategoryID, 
    this.storeInfo.StoreBackgroundImageID,this.storeInfo.StoreLogoID, success.bind(this), failed.bind(this))
  }
  GenerateID(success, failed){
    this.scgS.GenerateUID(success.bind(this), failed.bind(this))
  }
  InvokeBGImage(id){
    this.DiscardBGImage(function(){
      this.storeInfo.StoreBackgroundImageID=id;
    }.bind(this), this.Failed.bind(this))
  }
  InvokeLogoImage(id){
    this.DiscardLogo(function(){
      this.storeInfo.StoreLogoID=id;
    }.bind(this), this.Failed.bind(this))
  }
  RemoveLink(id:string,  success, failed){
    this.ilsS.Remove(id, this.gData.applicationID, this.storeInfo.ID,success.bind(this), failed.bind(this))
  }
  
}
