import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupProfilePage } from './setup-profile';

@NgModule({
  declarations: [
    SetupProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SetupProfilePage),
  ],
})
export class SetupProfilePageModule {}
