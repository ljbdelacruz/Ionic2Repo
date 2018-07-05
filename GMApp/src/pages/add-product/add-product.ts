import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ItemVM, ItemImageVM, ItemSubCategoryVM} from '../../model/model.model'
import {GeneralService} from '../../services/general.service'
import {UploadService} from '../../services/controller/82/upload.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {ItemService} from '../../services/controller/81/item.service'
import {ItemImageService} from '../../services/controller/81/itemImage.service'
import {ItemFunction} from '../../services/function/item.function'
import {ItemAssignCategoryService} from '../../services/controller/81/itemAssignCategory.service'
import {SelectCategoryPage} from '../select-category/select-category'
import {ItemAssignCategoryFunction} from '../../services/function/itemAssignCategory.function'
import {UploadersFunction} from '../../services/apiServices/Uploaders/uploaders.function'
import {UploadersService} from '../../services/apiServices/Uploaders/uploaders.service'
@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  itemInfo:ItemVM=new ItemVM();
  itemImages:ItemImageVM[]=[];
  mode:number=1;
  //mode 1 - add
  //mode 2 - edit
  constructor(public navCtrl: NavController, public navParams: NavParams, private gSer:GeneralService,
  private uploadS:UploadService, private gData:GlobalDataService, private itemS:ItemService, private itemF:ItemFunction,
  private itemIS:ItemImageService, private itemAS:ItemAssignCategoryService, private itemACF:ItemAssignCategoryFunction,
  private uploadersF:UploadersFunction, private uploadersS:UploadersService){
    var param=this.navParams.get("param");
    this.mode=param.mode;
    if(this.mode==2){
      this.itemInfo=param.data;
      this.itemImages=this.itemInfo.ItemImages;
      if(this.itemInfo.Categories[0]!=undefined){
        this.selectedSub.set(this.itemInfo.Categories[0].SubCategories[0]);
      }
    }
    this.gSer.GetCurrentLocation(function(resp){
      console.log("Got Location");
      console.log(resp);
      this.gData.myLocation.set(resp.long, resp.lat)
    }.bind(this), function(resp){
      console.log("failed getting Location");
      console.log(resp);
    }.bind(this))

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  file:any;
  isUploadingProductImage:boolean=false;
  UploadImage(){
    this.isUploadingProductImage=true;
    var temp=new ItemImageVM();
    this.uploadersS.UploadImage("GEO/Items", function(path){
      temp.Source=this.gData.uploadURL+path;
      if(this.mode==1){
        this.isUploadingProductImage=false;
        this.itemImages.push(temp);
      }
      else if(this.mode==2){
        //if edit diritso upload and save sa db
        this.itemIS.Insert(temp.Source, this.itemInfo.ID, function(ii){
          this.isUploadingProductImage=false;
          temp.ID=ii.data;
          this.itemImages.push(temp);
        }.bind(this), function(ii){
          this.isUploadingProductImage=false;
          this.gSer.ShowAlert(ii.message);
        }.bind(this))
      }

    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
      this.isUploadingProductImage=false;
    }.bind(this))
  }

  //insert sub category
  InsertSC(id:string){
    this.itemAS.Insert(id, this.selectedSub.ID, function(){}, function(resp){
      this.gSer.ShowAlert(resp.message);
    }.bind(this))
  }
  SelectCategoryPage(){
    this.navCtrl.push(SelectCategoryPage, {"param":{selectedEvent:this.CategorySelected.bind(this), mode:1}});
  }
  selectedSub:ItemSubCategoryVM=new ItemSubCategoryVM();
  CategorySelected(cat:ItemSubCategoryVM){
    this.selectedSub=cat;
  }
  SaveChanges(){
    if(this.mode==1){
      this.CheckContentValidity(function(){
        this.InsertProduct()
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }else if(this.mode==2){
      this.UpdateProduct();
    }
  }
  InsertProduct(){
    var load:any;
    this.gSer.ShowLoadingCtrlInstance("Creating Ad Please Wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.itemS.Insert(this.itemInfo.Title, this.itemInfo.Description, this.itemInfo.Price, 
    this.gData.userLoginInfo.ID, this.selectedSub.ID, this.gData.myLocation.longitude, 
    this.gData.myLocation.latitude, this.gData.api, this.itemInfo.PostType, function(resp){
      //resp.data = id of newly added item
      //insert item images
      this.itemF.InsertII(this.itemImages, resp.data, function(){}, function(message){this.gSer.ShowAlert(message);}.bind(this))
      load.dismiss();
      //insert sub category
      this.InsertSC(resp.data);
      this.gSer.ShowAlert("Created Ad!");
      this.Close();
    }.bind(this), function(resp){
      this.gSer.ShowAlert(resp.message);
      load.dismiss();
    }.bind(this))
  }
  UpdateProduct(){
    this.itemS.Update(this.itemInfo.ID, this.itemInfo.Title, this.itemInfo.Description, this.itemInfo.Price, 
    this.selectedSub.ID, this.itemInfo.isArchived, this.itemInfo.PostType, 
    function(resp){
      //update category
      this.UpdateSC();
      this.gSer.ShowAlert("Product Updated!");
      this.itemInfo.Categories[0].SubCategories[0]=this.selectedSub;
      this.Close();
    }.bind(this), function(resp){
      this.gSer.ShowAlert(resp.message);
    }.bind(this))
  }
  UpdateSC(){
    this.itemACF.Update(this.itemInfo.ID, this.selectedSub.ID, function(){}, function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  RemoveImage(itemII:ItemImageVM){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Removing image please wait...", function(obj){
      load=obj;
    }.bind(this))
    this.gSer.ShowAlertEvent("Do you want to remove this image?", "", "Yes", "No", function(){
      load.present();
      if(this.mode==2){
        this.itemIS.Remove(itemII.ID, function(){
          this.itemF.FindIIIndex(this.itemImages, itemII, function(index){
            this.itemImages.splice(index, 1);
            load.dismiss();
            this.gSer.ShowAlert("Image Removed!");
          }.bind(this))
        }.bind(this), function(resp){
          load.dismiss();
          this.gSer.ShowAlert(resp.message);
        }.bind(this))
      }else{
        var index=this.itemImages.findIndex(x=>x.Source==itemII.Source);
        this.itemImages.splice(index, 1);
        load.dismiss();
        this.gSer.ShowAlert("Image Removed!");
      }
    }.bind(this), function(){}.bind(this))
  }

  CheckContentValidity(success, failed){
    console.log("Checking Validity")
    console.log(this.gData.myLocation);
    if(this.gData.myLocation.longitude == 0 || this.gData.myLocation.latitude == 0){
      failed("Make sure location permission is enabled")
    }else if(this.itemImages.length<=0){
      failed("Make sure to upload at least 1 or more images");
    }else{
      success();
    }
  }

}
