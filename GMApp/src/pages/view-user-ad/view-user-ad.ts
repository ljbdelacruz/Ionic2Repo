import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {ItemFunction} from '../../services/function/item.function'
import {GeneralService} from '../../services/general.service'
import {ItemVM} from '../../model/model.model'
import {ViewAdDetailsPage} from '../view-ad-details/view-ad-details'
import {AddProductPage} from '../add-product/add-product'
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import {GlobalDataService} from '../../services/singleton/global.data'
import {SendMessagePage} from '../send-message/send-message'
@IonicPage()
@Component({
  selector: 'page-view-user-ad',
  templateUrl: 'view-user-ad.html',
})
export class ViewUserAdPage {
  userID:string="";
  isSuccessLoading:boolean=false;
  mode:number=1;
  isOwner:boolean=false;
  //1-view user ads 2-wishlist
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemF:ItemFunction, private gSer:GeneralService,
  private popOverCtrl:PopoverController, private gData:GlobalDataService) {
    var param=this.navParams.get("param");
    this.userID=param.uid;
    console.log(this.userID);
    if(this.gData.userLoginInfo.ID == param.uid){
      this.isOwner=true;
    }
    this.mode=param.mode;
    if(this.mode==1){
      this.Load();
    }else{
      //load storage data
    }
  }
  Load(){
    this.isSuccessLoading=false;
    this.LoadAds(function(){
      this.LoadSoldItems(function(){
        this.isSuccessLoading=true;
      }.bind(this))
    }.bind(this));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserAdPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  items:ItemVM[]=[];
  LoadAds(success){
    this.itemF.GetByOwnerID(this.userID, false, function(data){
      console.log(data);
      this.items=data;
      success();
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  ViewAdDetails(item:ItemVM){
    this.navCtrl.push(ViewAdDetailsPage, {"param":{data:item}});
  }
  moreOptionPopover:any;
  selectedItem:ItemVM=new ItemVM();
  MoreOptionEvent(event, item:ItemVM){
    this.selectedItem=item;
    this.moreOptionPopover = this.popOverCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Mark As Sold', value:1}, {label:'Edit', value:2}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreOptionPopover.present({
      ev: event
     });   
  }
  SoldMoreOptionEvent(event, item:ItemVM){
    this.selectedItem=item;
    this.moreOptionPopover = this.popOverCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Mark Available', value:4}, {label:'Edit', value:2}, {label:'Delete', value:3}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreOptionPopover.present({
      ev: event
     });   
  }
  PopupButtonEvent(value){
    this.moreOptionPopover.dismiss();
    if(value==1){
      this.selectedItem.isArchived=true;
      this.itemF.Archive(this.selectedItem, this.gData.api, function(){
        this.gSer.ShowAlert(this.selectedItem.Title+" Marked As Sold!");
        this.itemF.FindIndex(this.items, this.selectedItem, function(index){
          this.items.splice(index, 1);
          this.selectedItem=new ItemVM();
          this.Load();
        }.bind(this))
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }else if(value == 2){
        //edit item
        this.navCtrl.push(AddProductPage, {"param":{mode:2, data:this.selectedItem}});
    }else if(value==3){
      //delete
      this.gSer.ShowAlert("Feature unavailable at this moment");
    }else if(value==4){
      //mark as available
      this.selectedItem.isArchived=false;
      this.itemF.Archive(this.selectedItem, this.gData.api, function(){
        this.gSer.ShowAlert(this.selectedItem.Title+" Marked As Available!");
        this.itemF.FindIndex(this.items, this.selectedItem, function(index){
          this.items.splice(index, 1);
          this.selectedItem=new ItemVM();
          this.Load();
        }.bind(this))
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }
  }
  AddAdEvent(){
    this.navCtrl.push(AddProductPage, {"param":{mode:1}});
  }
  segmentSelected:string="selling";
  //selling, sold
  soldItems:ItemVM[]=[];
  LoadSoldItems(success){
    this.itemF.GetByOwnerID(this.userID, true, function(data){
      this.soldItems=data;
      success();
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }




}
