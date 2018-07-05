import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadMorePage } from './read-more';

@NgModule({
  declarations: [
    ReadMorePage,
  ],
  imports: [
    IonicPageModule.forChild(ReadMorePage),
  ],
})
export class ReadMorePageModule {}
