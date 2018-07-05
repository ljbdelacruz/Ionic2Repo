import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CloudNotificationService} from '../../services/apiServices/cloudNotificationService/cloudNotification.service'
import {NotificationManagerVM} from '../../services/apiServices/cloudNotificationService/model.model'
import {InboxPage} from '../inbox/inbox'
@IonicPage()
@Component({
  selector: 'page-view-notification',
  templateUrl: 'view-notification.html',
})
export class ViewNotificationPage {
  list:NotificationManagerVM[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private cnS:CloudNotificationService) {
    var param=this.navParams.get("param");
    param.updateNotifCount();
    this.cnS.GetNotifications(function(list){
      this.list=list;
    }.bind(this), function(){}.bind(this))
    this.cnS.StoreLocalNotificationCount(0);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotificationPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  Remove(item:NotificationManagerVM){
    this.cnS.Splice(this.list, item, function(nlist){
      this.list=nlist;
      this.cnS.StoreLocalNotification(this.list);
    }.bind(this))
  }
  NavigateNotification(item:NotificationManagerVM){
    if(item.Title == "New Message" || item.Title=="New Ad Inquiry"){
      //navigate to inbox
      this.navCtrl.push(InboxPage);
    }
  }


}
