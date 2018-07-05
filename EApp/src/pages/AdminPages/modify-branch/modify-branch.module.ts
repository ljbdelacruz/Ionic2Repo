import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyBranchPage } from './modify-branch';

@NgModule({
  declarations: [
    ModifyBranchPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyBranchPage),
  ],
})
export class ModifyBranchPageModule {}
