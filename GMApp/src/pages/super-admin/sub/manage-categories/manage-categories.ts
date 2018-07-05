import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ItemCategoryVM, ItemSubCategoryVM} from '../../../../model/model.model'
import {ItemCategoryFunction} from '../../../../services/function/itemCategory.function'
import {GeneralService} from '../../../../services/general.service'
import {GlobalDataService} from '../../../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-manage-categories',
  templateUrl: 'manage-categories.html',
})
export class ManageCategoriesPage {
  mode:number=1;
  isCategory:boolean=false;
  categoryInfo:ItemCategoryVM=new ItemCategoryVM();
  subCatInfo:ItemSubCategoryVM=new ItemSubCategoryVM();
  //1-add, edit
  categoryID:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemCF:ItemCategoryFunction,
  private gSer:GeneralService, private gData:GlobalDataService){
    var param=this.navParams.get("param");
    this.mode=param.mode;
    this.isCategory=param.isCategory;
    if(param.categoryID!=undefined){
      this.categoryID=param.categoryID;
    }
  }
  ionViewDidLoad() {}
  Close(){
    this.navCtrl.pop();
  }
  AddEvent(){
    this.gSer.ShowAlertEvent(this.isCategory?"Do you want to add this Category?":"Do you want to add this Sub Category?", "", "Yes", "No", 
    function(){
      if(this.isCategory){
        this.itemCF.Insert(this.categoryInfo.Name, function(id){
          this.categoryInfo.ID=id;
          this.gSer.ShowAlert("Added Category!");
          this.gData.categories.push(this.categoryInfo);
          this.Close();
        }.bind(this), function(message){}.bind(this))
      }else{
        this.itemCF.InsertSub(this.subCatInfo.Name, this.categoryID, function(id){
          this.subCatInfo.ID=id;
          this.itemCF.FindCatID(this.categoryID, this.gData.categories, function(index){
            this.gData.categories[index].SubCategories.push(this.subCatInfo);
          }.bind(this))
          this.gSer.ShowAlert("Added Sub Category!");
          this.Close();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))        
      }
    }.bind(this), function(){})

  }

}
