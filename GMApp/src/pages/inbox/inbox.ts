import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {MessagingRoomParticipantService} from '../../services/apiServices/messagingApp/messagingRoomParticipants.service'
import {MessagingRoomService} from '../../services/apiServices/messagingApp/messagingRoom.service'
import { MessagingRoomVM, MessagingRoomParticipantsVM } from '../../services/apiServices/messagingApp/model.model';
import {ChatSessionPage} from '../chat-session/chat-session'
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  noImagePath:string=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService, private gSer:GeneralService,
  private mrpS:MessagingRoomParticipantService, private mrS:MessagingRoomService, private popCtrl:PopoverController) {
    //load available rooms
    this.LoadRooms();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  roomlist:any=[];
  isLoadingRooms:boolean=true;
  participantData:MessagingRoomParticipantsVM[]=[];
  LoadRooms(){
    this.mrpS.GetByParticipantIDF(this.gData.userLoginInfo.ID, this.gData.uploadersAPI, function(list){
      if(list.length>0){
        this.participantData=list;
        list.forEach(el => {
          this.mrS.GetByIDF(el.RoomID, this.gData.uploadersAPI, function(data){
            this.roomlist.push(data);
            if(this.roomlist.length==list.length){
              this.isLoadingRooms=false;
            }
          }.bind(this), function(message){
            this.gSer.ShowAlert(message);
          }.bind(this))
        });
      }else{
        this.isLoadingRooms=false;
      }
    }.bind(this), 
    function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  ViewConversation(item:MessagingRoomVM){
    this.navCtrl.push(ChatSessionPage, {"param":{mode:1, data:item}});
  }
  moreOptionPopover:any;
  selectedItem:MessagingRoomVM=new MessagingRoomVM();
  ViewMoreOptions(event, item){
    this.selectedItem=item;
    this.moreOptionPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Remove', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreOptionPopover.present({
      ev: event
     });   
  }
  PopupButtonEvent(value){
    this.moreOptionPopover.dismiss();
    switch(value){
      case 1:
        this.LeaveConversation(this.selectedItem);
        break;
    }
  }
  LeaveConversation(item:MessagingRoomVM){
    this.gSer.ShowAlertEvent("Do you want to Leave this Room?", "Leaving this room you cannot retrieve the messages you exchanged with this room is it ok?",
    "Yes", "No", function(){
      this.mrpS.FindByRoomID(this.participantData, item.ID, function(index){
        if(index!=-1){
          this.mrpS.Remove(this.participantData[index].ID, function(){
            this.mrpS.Splice(this.participantData, index, function(plist){
              this.participantData=plist;
            }.bind(this))
            this.mrS.SpliceByID(this.roomlist, item.ID, function(list){
              this.roomlist=list;
            }.bind(this))
  
            this.gSer.ShowAlert("You left the group "+item.Name);
          }.bind(this), function(message){
            this.gSer.ShowAlert(message);
          }.bind(this))
        }
      }.bind(this))
    }.bind(this), function(){}.bind(this))

  }

}
