import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAdDetailsPage } from './view-ad-details';

@NgModule({
  declarations: [
    ViewAdDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAdDetailsPage),
  ],
})
export class ViewAdDetailsPageModule {}
