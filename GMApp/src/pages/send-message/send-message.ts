import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import {GeneralService} from '../../services/general.service'
import {ChatSessionPage} from '../chat-session/chat-session'
import {MessagingRoomService} from '../../services/apiServices/messagingApp/messagingRoom.service'
@IonicPage()
@Component({
  selector: 'page-send-message',
  templateUrl: 'send-message.html',
})
export class SendMessagePage {
  mode:number
//1-send via IM, 2-via sms
  message:string;
  api:string;
  successEvent:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sms:SMS, private gSer:GeneralService,
  private mrS:MessagingRoomService) {
    var param=this.navParams.get("param");
    this.mode=param.mode;
    if(this.mode==1){
      //send via im
      this.title=param.title;
      this.api=param.api;
      this.inquirerID=param.inquirerID;
      this.adOwnerID=param.adOwnerID;
      this.successEvent=param.successEvent;
    }else{
      //send via sms
      this.contactNumber=param.contactNumber;
      this.title=param.title;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMessagePage');
  }
  Close(){
    this.navCtrl.pop();
  }
  PreselectMessage(m:string){
    this.message=m;
  }
  Send(){
    if(this.mode==1){
      //send via IM
      this.SendViaIM();
    }else{
      //send via sms
      this.SendViaSMS();
    }
  }
  contactNumber:string;
  title:string;
  SendViaSMS(){
    this.gSer.ShowAlertEvent("Is it alright if i send this message via sms?", "", "Yes", "No", 
    function(){
      this.sms.send(this.contactNumber, this.title+", "+this.message)
      this.gSer.ShowAlert("Message via sms sent!");      
    }.bind(this), function(){
      this.gSer.ShowAlert("Message not sent!");
    }.bind(this))
  }
  inquirerID:string;
  adOwnerID:string;
  SendViaIM(){
    this.mrS.CreateNewRoomForParticipants(this.title, this.api, this.message, "46a4d670-cda1-483c-a35a-1b7ac5111a5a", 
    this.inquirerID, this.adOwnerID, function(data){
      this.Close();
      this.navCtrl.push(ChatSessionPage, {"param":{mode:1, data:data}});
      this.successEvent();
    }.bind(this), function(message){}.bind(this))
  }





}
