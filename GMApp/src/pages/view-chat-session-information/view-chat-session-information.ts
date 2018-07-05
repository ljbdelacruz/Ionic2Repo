import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MessagingRoomVM} from '../../services/apiServices/messagingApp/model.model'
import {UsersViewModel} from '../../model/model.model'
import {GlobalDataService} from '../../services/singleton/global.data'
import {ViewUserInformationPage} from '../view-user-information/view-user-information'
@IonicPage()
@Component({
  selector: 'page-view-chat-session-information',
  templateUrl: 'view-chat-session-information.html',
})
export class ViewChatSessionInformationPage {
  noImagePath:string="";
  roomInfo:MessagingRoomVM=new MessagingRoomVM();
  participants:UsersViewModel[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService) {
    this.noImagePath=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    var param=this.navParams.get("param");
    this.roomInfo=param.roomInfo;
    this.participants=param.participants;
  }
  Close(){
    this.navCtrl.pop();
  }
  ViewUserInformation(user:UsersViewModel){
    console.log(user);
    this.navCtrl.push(ViewUserInformationPage, {"param":{userInfo:user, isAdmin:this.gData.userLoginInfo.ID == user.ID?true:false}});
  }



}
