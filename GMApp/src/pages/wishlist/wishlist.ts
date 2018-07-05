import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {ItemVM} from '../../model/model.model'
import {StorageFunction} from '../../services/function/storage.function'
import {ItemFunction} from '../../services/function/item.function'
import {ViewAdDetailsPage} from '../view-ad-details/view-ad-details'
import {GeneralService} from '../../services/general.service'
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storageF:StorageFunction, private itemF:ItemFunction, private gSer:GeneralService, private popCtrl:PopoverController) {
    this.LoadWishList();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }
  wishList:ItemVM[]=[];
  LoadWishList(){
    this.storageF.FetchFromLocal("wishlist", function(list){
      if(list != null){
        this.wishList=list;
      }
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  ViewAd(item:ItemVM){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Viewing ad please wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.itemF.GetIDStatus(item.ID, function(isArchived){
      item.isArchived=isArchived;
      this.navCtrl.push(ViewAdDetailsPage, {"param":{data:item}});
      load.dismiss();
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
      load.dismiss();
    }.bind(this))
  }
  Close(){
    this.navCtrl.pop();
  }
  moreMenuPopover:any;
  selectedItem:ItemVM;
  TogglePopover(event, item){
    this.selectedItem=item;
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[ 
    {label:'Info', value:2}, {label:'Remove', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });   
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //remove 
      var index=this.wishList.findIndex(x=>x.ID == this.selectedItem.ID);
      this.wishList.splice(index, 1);
      this.gSer.ShowAlert("Wishlist removed!");
      this.storageF.StoreToLocal("wishlist", this.wishList);
    }else{
      this.ViewAd(this.selectedItem);
    }
  }



}
