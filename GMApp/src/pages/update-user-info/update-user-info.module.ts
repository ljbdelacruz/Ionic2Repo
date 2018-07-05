import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateUserInfoPage } from './update-user-info';

@NgModule({
  declarations: [
    UpdateUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateUserInfoPage),
  ],
})
export class UpdateUserInfoPageModule {}
