import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseComponentsPage } from './choose-components';

@NgModule({
  declarations: [
    ChooseComponentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseComponentsPage),
  ],
})
export class ChooseComponentsPageModule {}
