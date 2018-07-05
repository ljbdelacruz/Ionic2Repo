import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import {GlobalDataService} from '../../services/singleton/global.data'
import {ViewProfilePage} from '../UserPages/view-profile/view-profile'
import {SearchStorePage} from '../UserPages/search-store/search-store'
import { CreateStorePage } from '../AdminPages/create-store/create-store';
import {StoreListPage} from '../AdminPages/store-list/store-list'
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  mode:number=0;
  //0-customer dashboard
  //1-branch attendant dashboard
  //2-store owner dashboard
  //3-driver dashboard
  constructor(public navCtrl: NavController, public navParams: NavParams, private popCtrl:PopoverController, private gData:GlobalDataService) {
    var param=this.navParams.get("param");
    this.mode=param.mode;
  }
  ionViewDidLoad() {}
  PopOverOptions(success){
    var popOverMenu;
    if(this.mode==0){
      popOverMenu=[{label:'View Profile', value:1},{label:'Logout', value:0}]
      success(popOverMenu)
    }else if(this.mode==1){
      popOverMenu=[{label:'Logout', value:0}]
      success(popOverMenu);
    }
  }
  moreMenuPopover:any;
  TogglePopover(event){
    var menu;
    this.PopOverOptions(function(list){
      menu=list;
    }.bind(this))
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:menu,
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==0){
      //logout
      this.gData.userInfo.empty();
      this.gData.userAccessLevel.empty();
      this.Close();
    }else if(value==1){
      //view profile
      this.navCtrl.push(ViewProfilePage, {"param":{uid:this.gData.userInfo.ID, isAdmin:true}});
    }else if(value==2){
    }else if(value==3){
    }
  }
  Close(){
    this.navCtrl.pop();
  }
  GotoSearchStore(){
    this.navCtrl.push(SearchStorePage, {"param":{uid:this.gData.userInfo.ID, mode:0}});
  }
  CreateStore(){
    this.navCtrl.push(CreateStorePage, {"param":{mode:0, uid:this.gData.userInfo.ID}});
  }
  StoreListAdmin(){
    this.navCtrl.push(StoreListPage, {"param":{uid:this.gData.userInfo.ID, mode:0}});
  }
}
