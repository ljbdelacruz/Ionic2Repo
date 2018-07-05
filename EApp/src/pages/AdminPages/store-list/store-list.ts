import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyStoreService} from '../../../services/apiServices/chronoidBaseApp/storeManagement/mystore.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import { MyStoreVM } from '../../../services/apiServices/chronoidBaseApp/storeManagement/model.model';
import {GeneralService} from '../../../services/general.service'
import {ImageLinkStorageService} from '../../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
@IonicPage()
@Component({
  selector: 'page-store-list',
  templateUrl: 'store-list.html',
})
export class StoreListPage {
  mode:number=0;
  //0-view my own store store admin side
  //1-search store user side
  uid:string;
  stores:MyStoreVM[];
  isLoading:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private msS:MyStoreService,
  private gData:GlobalDataService, private gSer:GeneralService, private ilsS:ImageLinkStorageService){
    var param=this.navParams.get("param");
    this.stores=[];
    this.mode=param.mode;
    if(this.mode==0){
      this.uid=param.uid;
    }
    this.LoadStores(function(){
      this.msS.GetImages(this.stores, this.gData.applicationID, function(data){
        this.isLoading=false;
        console.log(data);
      }.bind(this), function(message){
        this.gSer.ShowAlert(message)
      }.bind(this))
    }.bind(this), this.ShowAlert.bind(this))
  }
  ionViewDidLoad(){}
  LoadStores(success, failed){
    this.isLoading=true;
    if(this.mode==0){
      //load by uid
      this.msS.GetByUIDAppID(this.uid, this.gData.applicationID, function(data){
        this.msS.MsToVMs(data, function(list){
          this.stores=list;
          success(list);
        }.bind(this))
      }.bind(this), failed.bind(this))
    }
  }
  Close(){this.navCtrl.pop();}
  ShowAlert(message){
    this.gSer.ShowAlert(message);
    this.isLoading=false;
  }

}
