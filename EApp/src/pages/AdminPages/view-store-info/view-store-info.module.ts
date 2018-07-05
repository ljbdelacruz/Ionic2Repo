import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewStoreInfoPage } from './view-store-info';

@NgModule({
  declarations: [
    ViewStoreInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewStoreInfoPage),
  ],
})
export class ViewStoreInfoPageModule {}
