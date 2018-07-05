import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ItemVM, ItemCategoryVM, ItemSubCategoryVM} from '../../model/model.model'
import {SelectCategoryPage} from '../select-category/select-category'
import {ItemCategoryFunction} from '../../services/function/itemCategory.function'
import {GlobalDataService} from '../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  filterEvent:any;
  categories:ItemCategoryVM[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemCF:ItemCategoryFunction,
  private gData:GlobalDataService) {
    var param=this.navParams.get("param");
    this.searchText=param.text;
    this.postType=param.type
    this.categories=param.categories;
    this.filterEvent=param.filterEvent;
    this.radiusRange=Number(param.radius*100);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  Filter(){
    //parameters
    //search text, selling type, categories, radius
    this.filterEvent(this.searchText, this.postType, this.categories, Number(this.radiusRange / 100));
    this.Close();
  }
  searchText:string="";
  postType:number=1;
  FilterBySearchBox(event){
    let val = event.target.value;
    this.searchText=val;
  }
  OpenCategoryEvent(){
    this.navCtrl.push(SelectCategoryPage, {"param":{selectedEvent:this.CategorySelected.bind(this), mode:1}});
  }
  CategorySelected(item:ItemSubCategoryVM){
    if(this.categories.length<=0){
      this.FilterCategory1(item.ID);      
    }else{
      this.itemCF.FindBySubCatIDIndex(item.ID, this.categories, function(index){
        console.log("Filtering");
        console.log(index);
        if(index==-1){
          this.FilterCategory1(item.ID);
        }
      }.bind(this))
    }
  }
  FilterCategory1(id:string){
    this.itemCF.FindBySubCatID(id, this.gData.categories, function(category){
      var temp=new ItemCategoryVM();
      temp=category;
      this.categories.push(temp);
    }.bind(this), function(){})
  }
  RemoveCategory(cat:ItemCategoryVM){
    this.itemCF.RemoveByID(cat.SubCategories[0].ID, this.categories, function(list){
      this.categories=list;
    }.bind(this));
  }
  radiusRange:number=0;
}
