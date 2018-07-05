import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {UsersViewModel, ItemVM, UserReviewVM} from '../../model/model.model'
import {ItemFunction} from '../../services/function/item.function'
import {GeneralService} from '../../services/general.service'
import {ViewUserAdPage} from '../view-user-ad/view-user-ad'
import {ViewUserReivewContentPage} from '../view-user-reivew-content/view-user-reivew-content'
import {UserReviewFunction} from '../../services/function/userReview.function'
import {GlobalDataService} from '../../services/singleton/global.data'
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import {ReportPage} from '../report/report'
@IonicPage()
@Component({
  selector: 'page-view-user-information',
  templateUrl: 'view-user-information.html',
})
export class ViewUserInformationPage {
  noImagePath:string="";
  userInfo:UsersViewModel=new UsersViewModel();
  isAdmin:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemF:ItemFunction, private gSer:GeneralService,
  private userRF:UserReviewFunction, private gData:GlobalDataService, private popCtrl:PopoverController) {
    this.noImagePath=this.gData.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    var param=this.navParams.get("param");
    this.userInfo=param.userInfo;
    this.isAdmin=param.isAdmin;
    this.LoadItems();
    this.LoadReviews();
    this.CalculateReview();
  }
  ionViewDidLoad() {
  }
  Close(){
    this.navCtrl.pop();
  }
  items:ItemVM[]=[];
  LoadItems(){
    this.itemF.GetByOwnerID(this.userInfo.ID, false, function(list){
      this.items=list;
    }.bind(this),function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  userReviews:UserReviewVM[]=[];
  LoadReviews(){
    this.userRF.GetByUserID(this.userInfo.ID, function(data){
      this.userReview=data;
    }.bind(this), function(message){}.bind(this))
  }
  userRevCount=0;
  userRevCountArray=[];
  unfilledRevCountArray=[];
  CalculateReview(){
    this.userRF.CalculateReview(this.userInfo.ID, this.gData.geoMarketAPI, function(count){
      count=count-1;
      this.unfilledRevCountArray=Array(4-count).fill(0).map((x,i)=>i)
      this.userRevCountArray=Array(count+1).fill(0).map((x,i)=>i)
    }.bind(this), function(message){
    }.bind(this))
  }
  ViewAds(){
    this.navCtrl.push(ViewUserAdPage, {"param":{uid:this.userInfo.ID, mode:1}});
  }
  ViewUserReviewContent(){
    this.navCtrl.push(ViewUserReivewContentPage, {"param":{uid:this.userInfo.ID}});
  }
  moreOptionPopover:any;
  ViewMoreOptions(event){
    this.moreOptionPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Report', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreOptionPopover.present({
      ev: event
     });   
  }
  PopupButtonEvent(value){
    this.moreOptionPopover.dismiss();
    switch(value){
      case 1:
        //report this user
        this.navCtrl.push(ReportPage, {"params":{uid:this.userInfo.ID}});
        break;
    }
  }


}
