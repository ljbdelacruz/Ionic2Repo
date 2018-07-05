import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateStorePage } from './create-store';

@NgModule({
  declarations: [
    CreateStorePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateStorePage),
  ],
})
export class CreateStorePageModule {}
