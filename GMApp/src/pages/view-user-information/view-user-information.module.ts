import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewUserInformationPage } from './view-user-information';

@NgModule({
  declarations: [
    ViewUserInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewUserInformationPage),
  ],
})
export class ViewUserInformationPageModule {}
