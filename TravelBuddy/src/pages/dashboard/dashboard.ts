import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
//page
import {ViewProfilePage} from '../view-profile/view-profile'
import {PopupMenuComponent} from '../../component/popupMenu1/popMenu1.components'
import {SetupProfilePage} from '../setup-profile/setup-profile'
import {ViewPhotosPage} from '../view-photos/view-photos'
import {ReadMorePage} from '../read-more/read-more'
import {NotificationsPage} from '../notifications/notifications'
//services
import {GlobalDataService} from '../../services/singleton/globalData.data'
import {UsersServices} from '../../services/controller/userService.controller'
import {VlogConnectionService} from '../../services/controller/vlogConnection.service'
import {GeneralService} from '../../services/general.service' ;
import {VlogConnection, VloggerDescriptionViewModel} from '../../models/model.model'
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  posts:VlogConnection[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl:MenuController,
              private popCtrl:PopoverController, private usersS:UsersServices, private gData:GlobalDataService,
              private genS:GeneralService, private vlogConnectionS:VlogConnectionService) {
    //checks if profile is setup
    this.CheckProfileExist(this.gData.userLoginInfo.ID);
    // this.usersS.GetByUID()
    this.GetNewsFeedContent(this.gData.userLoginInfo.ID, function(resp){
      this.posts=[];
      resp.data.forEach(vlogConn => {
        var temp=new VlogConnection();
        temp.set(vlogConn);
        this.posts.push(temp);
      });
    }.bind(this), function(resp){
      console.log(resp);
    }.bind(this))
  }
  ionViewDidLoad() {
  }
  //button events
  ToggleMenu(){
    this.menuCtrl.open();
  }
  Logout(){
    this.menuCtrl.toggle().then(function(){
      this.navCtrl.pop();
    }.bind(this))
  }
  ViewProfile(){
    this.menuCtrl.toggle().then(function(){
      this.navCtrl.push(ViewProfilePage, {"params":{mode:1}});
    }.bind(this))
  }
  ViewUserProfile(user:VloggerDescriptionViewModel){
    console.log(user.ID);
    this.navCtrl.push(ViewProfilePage, {"params":{viewUser:user, mode:2}});
  }
  //searchbar events
  searchBarPopover:any=null;
  OnSearchEvent(event){
    // if(event.data != null){
    //   this.searchBarPopover=null;
    //   if(this.searchBarPopover == null){
    //     this.searchBarPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Request Orders', value:1}, {label:'John Dablo', value:2}],
    //     buttonEvent:this.PopupEvent.bind(this), title:''}});     
    //     this.searchBarPopover.present({
    //       ev: event
    //     });
    //   }  
    // }
  }
  ReadMore(post){
    this.navCtrl.push(ReadMorePage, {"param":{data:post}})
  }
  NotificationsEvent(){
    this.navCtrl.push(NotificationsPage);
  }

  PopupEvent(value){
    console.log(value);
  }
  //check if this user already have profile
  CheckProfileExist(uid:string){
    var load:any;
    this.genS.ShowLoadingCtrlInstance("Checking profile please wait...", function(obj){
      load=obj;
    }.bind(this))    
    load.present();
    this.usersS.IsProfileExist(uid, function(resp){
      if(!resp.data){
        this.navCtrl.push(SetupProfilePage, {"param":{data:uid}});
      }
      load.dismiss();
    }.bind(this), function(resp){
      this.genS.ShowAlert(resp.message);
      load.dismiss();
    }.bind(this));
  }
  isLoadingPost:boolean=false;
  GetNewsFeedContent(uid:string, success, failed){
    this.isLoadingPost=true;
    this.vlogConnectionS.GetUserNewsFeed(uid, function(resp){
      this.isLoadingPost=false;
      success(resp);
    }.bind(this), function(resp){
      this.isLoadingPost=false;
      failed(resp);
    }.bind(this));
  }


}
