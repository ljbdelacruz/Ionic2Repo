import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchlistPage } from './branchlist';

@NgModule({
  declarations: [
    BranchlistPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchlistPage),
  ],
})
export class BranchlistPageModule {}
