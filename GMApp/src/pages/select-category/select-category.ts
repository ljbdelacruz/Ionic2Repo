import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {ItemCategoryFunction} from '../../services/function/itemCategory.function'
import {ItemCategoryVM, ItemSubCategoryVM} from '../../model/model.model'
import {GlobalDataService} from '../../services/singleton/global.data'
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import {GeneralService} from '../../services/general.service'
import {ManageCategoriesPage} from '../super-admin/sub/manage-categories/manage-categories'
@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {
  categories:ItemCategoryVM[]=[];
  subCategories:ItemSubCategoryVM[]=[];
  selectedEvent:any;
  mode:number=1;
  //1-add, 2-edit, 3-rename
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemCF:ItemCategoryFunction, private gData:GlobalDataService,
  private popOverCtrl:PopoverController, private gSer:GeneralService) {
    var param=this.navParams.get("param");
    if(param.selectedEvent !=undefined){
      this.selectedEvent=param.selectedEvent;
    }
    if(param.mode!=undefined){
      this.mode=param.mode;
    }
    this.LoadCategory();
  }
  ionViewDidLoad() {
  }
  LoadCategory(){
    this.categories=this.gData.categories;
  }
  isSelectedCategory:boolean=false;
  SelectCategory(category:ItemCategoryVM){
    this.ToggleSelectedCat();
    this.subCategories=category.SubCategories;
  }
  ToggleSelectedCat(){
    this.isSelectedCategory=!this.isSelectedCategory;
  }
  Cancel(){
    this.ToggleSelectedCat();
  }
  Close(){
    this.navCtrl.pop();
  }
  SelectSubCategory(sub:ItemSubCategoryVM){
    if(this.selectedEvent!=undefined){
      this.selectedEvent(sub);
    }
    this.Close();
  }
  //popover
  moreCatPopover:any;
  selectedCategory:ItemCategoryVM=new ItemCategoryVM();
  MoreCatPopOver(event, cat:ItemCategoryVM){
    this.selectedCategory.set(cat);
    this.selectedCategory.SubCategories=cat.SubCategories;
    this.moreCatPopover = this.popOverCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Rename', value:1}, {label:'Subcategories', value:2}, {label:'Archive', value:3}],
    buttonEvent:this.MoreCatButtonEvent.bind(this), title:''}});     
    this.moreCatPopover.present({
      ev: event
    });   
  }
  subCatPopOver:any;
  selectedSub:ItemSubCategoryVM=new ItemSubCategoryVM();
  MoreSubCatPopOver(event, sub:ItemSubCategoryVM){
    this.selectedSub.set(sub);
    this.subCatPopOver = this.popOverCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Rename', value:4}, {label:'Archive', value:5}],
    buttonEvent:this.MoreCatButtonEvent.bind(this), title:''}});     
    this.subCatPopOver.present({
      ev: event
    });   
  }
  valueOption:number=0;
  MoreCatButtonEvent(value){
    if(this.isSelectedCategory){
      this.subCatPopOver.dismiss();
    }else{
      this.moreCatPopover.dismiss();
    }
    this.valueOption=value;
    if(value==1){
      //rename
      this.mode=3;
    }else if(value==2){
      this.ToggleSelectedCat();
      //view sub categories
    } else if(value==3){
      //archive category
      this.Archive();
    }else if(value==4){
      //rename subcat
      this.mode=3;
    }else if(value==5){
      //archive subcat
      this.Archive();
    }
  }
  CancelMode3(){
    this.mode=2;
  }
  SaveChanges(){
    var message="";
    if(this.valueOption==1){
      message="Do you want to Update Category Name?";
    }else{
      message="Do you want to Update Sub Category Name?"
    }
    this.gSer.ShowAlertEvent(message, "", "Yes", "No", 
    function(){
      if(!this.isSelectedCategory){
        this.itemCF.Update(this.selectedCategory.ID, this.selectedCategory.Name, false, 
        function(){
          this.itemCF.FindCatID(this.selectedCategory.ID, this.gData.categories, function(index){
            this.gData.categories[index]=this.selectedCategory;
          }.bind(this))
          this.gSer.ShowAlert("Rename Successfully");
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }else{
        this.itemCF.UpdateSub(this.selectedSub.ID, this.selectedSub.Name, false, function(){
          //find category id
          this.itemCF.FindCatID(this.selectedCategory.ID, this.gData.categories, function(index){
            //find subcategories arrays
            this.itemCF.FindSubCat(this.selectedSub.ID, this.gData.categories[index].SubCategories, function(index2){
              //update the category subcategories array data by the newly renamed
              this.gData.categories[index].SubCategories[index2]=this.selectedSub;
            }.bind(this))
          }.bind(this))
          this.gSer.ShowAlert("Renamed Successfully");
        }.bind(this), function(message){
          this.gser.ShowAlert(message);
        }.bind(this))
      }
      this.CancelMode3();
    }.bind(this), function(){
    }.bind(this))
  }
  AddEvent(){
    if(!this.isSelectedCategory){
      this.navCtrl.push(ManageCategoriesPage, {"param":{mode:1, isCategory:true, categoryID:undefined}});
    }else{
      this.navCtrl.push(ManageCategoriesPage, {"param":{mode:1, isCategory:false, categoryID:this.selectedCategory.ID}});
    }
  }
  Archive(){
    if(!this.isSelectedCategory){
      this.itemCF.Update(this.selectedCategory.ID, this.selectedCategory.Name, true, function(){
        this.gSer.ShowAlert("Category Archived!");
        this.itemCF.FindCatID(this.selectedCategory.ID, this.gData.categories, function(index){
          this.gData.categories.splice(index, 1);
        }.bind(this))
      }.bind(this), function(message){
        this.gSer.ShowAlert("ERROR Archiving Category");
      }.bind(this))
    }else{
      this.itemCF.UpdateSub(this.selectedSub.ID, this.selectedSub.Name, true, function(){
        this.gSer.ShowAlert("Sub Category Archived!");
        this.itemCF.FindCatID(this.selectedCategory.ID, this.gData.categories, function(index){
          this.itemCF.FindSubCat(this.selectedSub.ID, this.gData.categories[index].SubCategories, function(index2){
            this.gData.categories[index].SubCategories.splice(index2, 1);      
          }.bind(this))
        }.bind(this))
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }

  }
  
}
