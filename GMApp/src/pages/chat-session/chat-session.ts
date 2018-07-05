import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MessagingRoomVM, MessagingConversationVM} from '../../services/apiServices/messagingApp/model.model'
import {MessagingConversationService} from '../../services/apiServices/messagingApp/messagingConversation.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {UsersViewModel} from '../../model/model.model'
import {StorageFunction} from '../../services/function/storage.function'
import {UploadersService} from '../../services/apiServices/Uploaders/uploaders.service'
import {UserFunction} from '../../services/function/user.function'
import {MessagingRoomParticipantService} from '../../services/apiServices/messagingApp/messagingRoomParticipants.service'
import {ViewUserInformationPage} from '../view-user-information/view-user-information'
import {ViewChatSessionInformationPage} from '../view-chat-session-information/view-chat-session-information'
import {GeneralService} from '../../services/general.service'
@IonicPage()
@Component({
  selector: 'page-chat-session',
  templateUrl: 'chat-session.html',
})
export class ChatSessionPage {
  noImagePath:string="";
  userInfo:UsersViewModel;
  roomInfo:MessagingRoomVM;
  participants:UsersViewModel[]=[];
  //mode=1 - normal chatbox
  constructor(public navCtrl: NavController, public navParams: NavParams, private mcS:MessagingConversationService, private gData:GlobalDataService,
  private sF:StorageFunction, private upS:UploadersService, private userF:UserFunction, private mrpS:MessagingRoomParticipantService, private gSer:GeneralService) {
    this.noImagePath=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    this.userInfo=this.gData.userLoginInfo;
    var param=this.navParams.get("param");
    if(param.mode==1){
      this.roomInfo=param.data;
      this.GetParticipantsInfo();
      this.LoadMessages();
      
      //listen to signalR notification
      this.mcS.ListenNewMessageFromThisRoom(this.roomInfo.ID, function(messageID, api, roomID){
        this.mcS.GetByID(messageID, function(data){
          this.NewMessageAdded(data);
        }.bind(this),function(message){}.bind(this))
      }.bind(this), function(roomID, uid, api){
        this.LeaveParticipant(uid);
      }.bind(this), function(message){}.bind(this))
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatSessionPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  messages:MessagingConversationVM[]=[];
  localMessages:MessagingConversationVM[]=[];
  LoadMessages(){
    //get message locally
    this.sF.FetchFromLocal(this.roomInfo.ID, function(data){
      if(data!=null){
        this.localMessages=data;
        this.FilterMessages();
      }else{
        this.FilterMessages();
      }
    }.bind(this), function(){})
  }
  isLoadingMessage:boolean=true;
  FilterMessages(){
    this.mcS.GetByRoomIDF(this.roomInfo.ID, function(list){
      if(this.localMessages.length>0){
        this.mcS.JoinArray(list, this.localMessages, function(nlist){
          //store message from new list
          this.messages=nlist;
          this.sF.StoreToLocal(this.roomInfo.ID, nlist);
          this.isLoadingMessage=false;
        }.bind(this))
      }else{
        this.messages=list;
        this.sF.StoreToLocal(this.roomInfo.ID, list);
        this.isLoadingMessage=false;
      }
    }.bind(this), function(message){
      console.log(message);
    }.bind(this))
  }
  messageInfo:MessagingConversationVM=new MessagingConversationVM();
  SendMessageText(){
    if(this.participants.length > 1){
      this.messageInfo.MessageType="46a4d670-cda1-483c-a35a-1b7ac5111a5a"
      this.messageInfo.SenderID=this.userInfo.ID;
      this.mcS.Insert(this.messageInfo.Text, this.messageInfo.MessageType, this.userInfo.ID, this.roomInfo.ID, this.gData.uploadersAPI, 
      function(resp){
        this.ClearMessageModel();
      }.bind(this), function(resp){
        console.log(resp)
      }.bind(this))
    }else{
      this.gSer.ShowAlert("Message Sent Failed! Members already left");
    }
  }
  SendImageMessage(){
    if(this.participants.length > 1){
      this.messageInfo.MessageType="f7e61265-0ba9-4513-9993-870a57e2dbf2"
      this.messageInfo.SenderID=this.userInfo.ID;
      this.upS.UploadImage("GEO", function(path){
        this.messageInfo.Text=this.gData.uploadURL+path;
        this.mcS.Insert(this.messageInfo.Text, this.messageInfo.MessageType, this.userInfo.ID, this.roomInfo.ID, this.gData.uploadersAPI, 
        function(){
          this.ClearMessageModel();
        }.bind(this), function(){}.bind(this)) 
      }.bind(this), function(message){
      }.bind(this))
    }

  }
  isShowMore:boolean=false;
  ToggleIsShowMore(){
    this.isShowMore=!this.isShowMore;
  }
  NewMessageAdded(message:MessagingConversationVM){
    this.mcS.Stack(this.messages, message, function(list){
      this.messages=list;
      this.sF.StoreToLocal(this.roomInfo.ID, this.messages);
    }.bind(this))
  }
  ClearMessageModel(){
    this.messageInfo=new MessagingConversationVM();
  }
  GetParticipantsInfo(){
      this.participants=[];
      this.mrpS.GetByRoomIDF(this.roomInfo.ID, function(list){
        list.forEach(el =>{
          if(this.userInfo.ID == el.UserID){
            this.participants.push(this.userInfo);
          }else{
            this.userF.GetByID(el.UserID, function(model){
              this.participants.push(model);
            }.bind(this), function(){
            }.bind(this))
          }
        });
      }.bind(this), function(message){
        console.log(message);
      }.bind(this))
      console.log("Participants");
      console.log(this.participants);
  }
  participantLeft:UsersViewModel=new UsersViewModel();
  LeaveParticipant(id:string){
    this.userF.FindByID(this.participants, id, function(index){
      if(index!=-1){
        this.participantLeft=this.participants[index];
        this.gSer.presentToast(this.participantLeft.Firstname+" Left the room", 1000,"bottom", function(){});
        this.userF.Splice(this.participants, index, function(list){
          this.participants=list;
        }.bind(this))
      }
    }.bind(this))
  }


  ViewUserInformation(user:UsersViewModel){
    this.navCtrl.push(ViewUserInformationPage, {"param":{userInfo:user, isAdmin:false}})
  }
  ViewChatRoomInfo(){
    this.navCtrl.push(ViewChatSessionInformationPage, {"param":{participants:this.participants, roomInfo:this.roomInfo}});
  }

}
