import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectCategoryPage} from '../select-category/select-category'
@IonicPage()
@Component({
  selector: 'page-super-admin',
  templateUrl: 'super-admin.html',
})
export class SuperAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuperAdminPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  EditCategoriesEvent(){
    this.navCtrl.push(SelectCategoryPage, {"param":{selectedEvent:undefined, mode:2}});
  }


}
