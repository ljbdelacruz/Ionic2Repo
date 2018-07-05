import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCategoriesPage } from './manage-categories';

@NgModule({
  declarations: [
    ManageCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageCategoriesPage),
  ],
})
export class ManageCategoriesPageModule {}
