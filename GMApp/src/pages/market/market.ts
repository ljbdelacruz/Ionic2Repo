import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ItemFunction} from '../../services/function/item.function'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {ItemVM, ItemCategoryVM, ItemSubCategoryVM} from '../../model/model.model'
import {ViewAdDetailsPage} from '../view-ad-details/view-ad-details'
import {SelectCategoryPage} from '../select-category/select-category'
import {ItemCategoryFunction} from '../../services/function/itemCategory.function'
import {FilterPage} from '../filter/filter'
import {StorageFunction} from '../../services/function/storage.function'
import {WishlistPage} from '../wishlist/wishlist'
@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemF:ItemFunction,
  private gData:GlobalDataService, private gSer:GeneralService, private itemCF:ItemCategoryFunction,
  private storageF:StorageFunction){
    this.wishList=[];
    this.FilterByLocationRadius(this.gData.radius, function(){
    }.bind(this))
    this.GetWishList()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  items:ItemVM[]=[];
  displayItems:ItemVM[]=[];
  filteredLists:ItemVM[]=[];
  isFiltering:boolean=false;
  isFetchingAds:boolean=true;
  FilterByLocationRadius(radius, success){
    this.isFetchingAds=true;
    this.itemF.GetByLocation(this.gData.myLocation.longitude, this.gData.myLocation.latitude, 
      radius, function(resp){
        this.items=resp;
        this.displayItems=resp;
        this.isFetchingAds=false;
        success();
      }.bind(this), function(message){
        this.isFetchingAds=false;
        this.gSer.ShowAlert(message);
      }.bind(this))
  }
  FilterSearchFunc(text, success){
    if(text!=undefined && text != ""){
      this.itemF.FilterByLikeTitle(text, this.displayItems, function(data){
        this.isFiltering=true;
        this.filteredLists=data;
        success();
      }.bind(this)) 
    }else{
      this.isFiltering=true;
      this.filteredLists=this.displayItems;
      success();
    }
  }
  FilterByPostTypeFunc(type, success){
    this.itemF.FilterByPostType(type, this.filteredLists, function(arry){
      this.isFiltering=true;
      this.filteredLists=arry;
      success();
    }.bind(this));
  }
  FilterByCategoryFunc(category:ItemCategoryVM[], success){
    var tempList:ItemVM[]=[];
    if(category.length>0){
      category.forEach(el=>{
        this.itemF.FilterBySubCategory(this.filteredLists, el.SubCategories[0].ID, function(list){
          this.isFiltering=true;
          list.forEach(element => {
            tempList.push(element);
          });
        }.bind(this))
      })
      success(tempList);
    }
  }
  ViewAdDetails(item:ItemVM){
    this.navCtrl.push(ViewAdDetailsPage, {"param":{data:item}});
  }
  radiusRange:number=this.gData.radius;
  OpenFilterPageEvent(){
    this.navCtrl.push(FilterPage, {"param":{filterEvent:this.FilterEventSuccess.bind(this), text:this.searchText, type:this.postType, categories:this.categories, radius:this.radiusRange}});
  }
  searchText:string;

  categories:ItemCategoryVM[]=[];
  postType:number=1;
  FilterEventSuccess(text:string, type:number, categorys:ItemCategoryVM[], radius:number){
    this.searchText=text;
    this.postType=type;
    this.categories=categorys;
    this.radiusRange=radius;
    this.isFiltering=true;
    this.FilterByLocationRadius(radius, function(){
      this.FilterSearchFunc(text, function(){
        this.FilterByPostTypeFunc(type, function(){
          this.FilterByCategoryFunc(categorys,function(list){
            this.filteredLists=list;
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this))
  }
  //add to wishlist
  wishList:ItemVM[]=[];
  AddToWishList(ad:ItemVM){
    console.log(this.wishList);
    this.itemF.FindIndex(this.wishList, ad, function(index){
      if(index==-1){
        this.wishList.push(ad);
        this.storageF.StoreToLocal("wishlist", this.wishList);
      }
    }.bind(this))
    this.gSer.presentToast("Item added to wishlist!", 1000, "top", function(){})
  }
  GetWishList(){
    this.storageF.FetchFromLocal("wishlist", function(list){
      if(list != null){
        this.wishList=list;
      }
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  GotoWishList(){
    this.navCtrl.push(WishlistPage);
  }
}
