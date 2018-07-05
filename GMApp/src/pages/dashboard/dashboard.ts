import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import {MarketPage} from '../market/market'
import {AddProductPage} from '../add-product/add-product'
import {ViewUserAdPage} from '../view-user-ad/view-user-ad'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {InboxPage} from '../inbox/inbox'
import {ViewUserInformationPage} from '../view-user-information/view-user-information'
import {UpdateUserInfoPage} from '../update-user-info/update-user-info'
import {ItemFunction} from '../../services/function/item.function'
import {ItemVM} from '../../model/model.model'
import {ViewAdDetailsPage} from '../view-ad-details/view-ad-details'
import {CloudNotificationService} from '../../services/apiServices/cloudNotificationService/cloudNotification.service'
import {hubConnection} from 'signalr-no-jquery'
import {ViewNotificationPage} from '../view-notification/view-notification'
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  tempImage:string="";
  itemsMostViewed:ItemVM[]=[];
  isMostViewedLoading:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private popOverCtrl:PopoverController,
  private gData:GlobalDataService, private gSer:GeneralService, private itemF:ItemFunction, private cnS:CloudNotificationService) {
    this.tempImage=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    //get most viewed items
    this.itemF.GetByMostViewed(5, Number(this.gData.myLocation.longitude+this.gData.radius), Number(this.gData.myLocation.latitude+this.gData.radius), function(list){
      this.itemsMostViewed=list;
      this.isMostViewedLoading=false;
    }.bind(this), function(message){
      this.isMostViewedLoading=false;
    }.bind(this))
    //invoke the signalR for detecting Notification sent by users
    this.cnS.SendNotificationSignal(function(notification){
      this.StoreNotification(notification);
      //check notification
    }.bind(this), function(){}.bind(this), function(){
      this.cnS.CheckOwnerNotification(this.gData.uploadersAPI, this.gData.uploadersAPI, this.gData.userLoginInfo.ID, function(){}, function(){});
    }.bind(this))
    //enable background mode
    this.gSer.EnableBackgroundMode();
    //getting local notif count
    this.cnS.GetLocalNotificationCount(function(count){
      this.notificationCount=count;
    }.bind(this), function(){}.bind(this))
  }
  ionViewDidLoad() {}
  //popover element
  moreMenuPopover:any;
  TogglePopover(event){
    this.moreMenuPopover = this.popOverCtrl.create(PopupMenuComponent, {invoke:{buttons:[ 
    {label:'View Profile', value:2},{label:'Settings', value:3}, {label:'Logout', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });   
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //logout
      this.navCtrl.pop();
      this.gSer.DisableBackgroundMode();
    }else if(value==2){
      //view profile
      this.navCtrl.push(ViewUserInformationPage, {"param":{userInfo:this.gData.userLoginInfo}});
    }else if(value==3){
      //settings
      this.navCtrl.push(UpdateUserInfoPage, {"param":{mode:1}});
    }
  }
  MarketEvent(){
    this.navCtrl.push(MarketPage);
  }
  AddProductEvent(){
    this.navCtrl.push(AddProductPage, {"param":{mode:1}});
  }
  ViewMyAds(){
    this.navCtrl.push(ViewUserAdPage, {"param":{uid:this.gData.userLoginInfo.ID, mode:1}});
  }
  ViewMyInbox(){
    this.navCtrl.push(InboxPage);
  }
  ViewAdDetails(item:ItemVM){
    this.navCtrl.push(ViewAdDetailsPage, {"param":{data:item}});
  }
  CreateNotification(){
    this.cnS.Insert(this.gData.applicationID, this.gData.applicationID, "Test Notification If Working", "Test Message", 
    function(resp){
      this.cnS.InsertReceipent(resp.data, this.gData.userLoginInfo.ID, 
      this.gData.applicationID, function(){}.bind(this), function(resp2){
        console.log("Failed "+resp2.message)
      }.bind(this))
    }.bind(this), function(resp){
    }.bind(this))
  }
  notificationCount:number=0;
  StoreNotification(item){
    var list:any[]=[];
    this.notificationCount++;
    this.cnS.StoreLocalNotificationCount(this.notificationCount);
    this.cnS.GetNotifications(function(list){
      this.cnS.StoreLocalNotifications(item, list);
    }.bind(this), function(){}.bind(this))
  }
  ViewNotification(){
    this.navCtrl.push(ViewNotificationPage, {"param":{updateNotifCount:this.UpdateNotifCount.bind(this)}});
  }
  UpdateNotifCount(){
    this.notificationCount=0;
  }
  UpdateLocation(){

  }

}
