import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import {ItemVM, UsersViewModel} from '../../model/model.model'
import {GlobalDataService} from '../../services/singleton/global.data'
import {UserFunction} from '../../services/function/user.function'
import {GeneralService} from '../../services/general.service'
import {ViewUserInformationPage} from '../view-user-information/view-user-information'
import {ItemService} from '../../services/controller/81/item.service'
import {MessagingRoomService} from '../../services/apiServices/messagingApp/messagingRoom.service'
import {MessagingRoomParticipantService} from '../../services/apiServices/messagingApp/messagingRoomParticipants.service'
import {MessagingConversationService} from '../../services/apiServices/messagingApp/messagingConversation.service'
import {MessagingRoomVM} from '../../services/apiServices/messagingApp/model.model'
import {ChatSessionPage} from '../chat-session/chat-session'
import {CloudNotificationService} from '../../services/apiServices/cloudNotificationService/cloudNotification.service'
import {SendMessagePage} from '../send-message/send-message'
@IonicPage()
@Component({
  selector: 'page-view-ad-details',
  templateUrl: 'view-ad-details.html',
})
export class ViewAdDetailsPage {
  @ViewChild(Slides) slider:  Slides;
  noImagePath:string;
  itemInfo:ItemVM=new ItemVM();
  isAdOwner:boolean=false;
  userInfo:UsersViewModel=new UsersViewModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService, private userF:UserFunction,
  private gSer:GeneralService, private sms:SMS, private itemS:ItemService, private mrS:MessagingRoomService, private mrpS:MessagingRoomParticipantService,
  private mcS:MessagingConversationService, private cnS:CloudNotificationService) {
    this.noImagePath=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    var param=this.navParams.get("param");
    this.itemInfo=param.data;
    this.GetOwnerInfo();
    if(this.gData.userLoginInfo.ID == this.itemInfo.OwnerID){
      this.isAdOwner=true;
    }else{
      this.itemS.UpdateTimesViewed(this.itemInfo.ID, 1, function(){}, function(){});
    }
  }
  ionViewDidLoad() {
  }
  Close(){
    this.navCtrl.pop();
  }
  SlideChange(){
  }
  PrevSlide(){
    this.slider.slidePrev();
  }
  NextSlide(){
    this.slider.slideNext();
  }
  isGettingUserInfo:boolean=true;
  GetOwnerInfo(){
    this.userF.GetByID(this.itemInfo.OwnerID, 
    function(data){
      this.userInfo.set(data);
      this.isGettingUserInfo=false;
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  ViewUserInformation(){
    this.navCtrl.push(ViewUserInformationPage, {"param":{userInfo:this.userInfo, isAdmin:false}});
  }
  //
  AskAvailability(){
    this.gSer.ShowModal(SendMessagePage, {"param":{mode:1,title:this.itemInfo.Title, api:this.gData.uploadersAPI, inquirerID:this.gData.userLoginInfo.ID, 
    adOwnerID:this.userInfo.ID, successEvent:this.NotifyRoomCreation.bind(this)}});
  }
  //send via sms
  AskViaSMS(){
    this.gSer.ShowModal(SendMessagePage, {"param":{mode:2, contactNumber:this.userInfo.ContactNumber, title:this.itemInfo.Title}});
  }
  NotifyRoomCreation(){
    console.log("Room Creations");
    this.cnS.Insert(this.gData.applicationID, this.gData.applicationID, "New Ad Inquiry", "Created a new room conversation called "+this.itemInfo.Title, function(resp){
      //resp.data=id of the notificationManager created
      this.cnS.InsertReceipent(resp.data, this.userInfo.ID, this.gData.applicationID, function(resp){
      }.bind(this), function(){
      }.bind(this))
    }.bind(this), function(resp){
      console.log(resp);
    }.bind(this))
  }  
}
