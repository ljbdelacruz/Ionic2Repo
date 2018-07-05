import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyReviewPage } from './modify-review';

@NgModule({
  declarations: [
    ModifyReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyReviewPage),
  ],
})
export class ModifyReviewPageModule {}
