import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewStoreBranchInfoPage } from './view-store-branch-info';

@NgModule({
  declarations: [
    ViewStoreBranchInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewStoreBranchInfoPage),
  ],
})
export class ViewStoreBranchInfoPageModule {}
