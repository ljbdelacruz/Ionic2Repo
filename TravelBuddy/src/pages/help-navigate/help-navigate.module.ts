import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpNavigatePage } from './help-navigate';

@NgModule({
  declarations: [
    HelpNavigatePage,
  ],
  imports: [
    IonicPageModule.forChild(HelpNavigatePage),
  ],
})
export class HelpNavigatePageModule {}
