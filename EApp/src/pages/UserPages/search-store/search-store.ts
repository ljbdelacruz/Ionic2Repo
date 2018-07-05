import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyStoreService} from '../../../services/apiServices/chronoidBaseApp/storeManagement/mystore.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import {GeneralService} from '../../../services/general.service'
import { MyStoreVM } from '../../../services/apiServices/chronoidBaseApp/storeManagement/model.model';
@IonicPage()
@Component({
  selector: 'page-search-store',
  templateUrl: 'search-store.html',
})
export class SearchStorePage {
  mode:number=0;
  storeList:MyStoreVM[]=[];
  //0-user view store
  //1-view my stores
  uid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private msS:MyStoreService, private gData:GlobalDataService,
  private gSer:GeneralService){
    var param=this.navParams.get("param");
    this.uid=param.uid;
    this.mode=param.mode;
    this.LoadAllStoresAvailableInApp();
  }
  ionViewDidLoad(){}
  LoadAllStoresAvailableInApp(){
    if(this.mode==0){
      this.msS.GetByAppID(this.gData.applicationID, function(data){
        this.msS.MsToVMs(data, function(list){
          this.storeList=list;
        }.bind(this))
      }.bind(this), this.ShowAlert.bind(this))
    }else if(this.mode==1){
      this.msS.GetByUIDAppID(this.uid, this.gData.applicationID, function(data){
        this.msS.MsToVMs(data, function(list){
          this.storeList=list;
        }.bind(this))
      }.bind(this), this.ShowAlert.bind(this))
    }
  }
  Close(){
    this.navCtrl.pop();
  }
  ShowAlert(message){
    this.gSer.ShowAlert(message);
  }
}
