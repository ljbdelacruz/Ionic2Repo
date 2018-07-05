import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQuestionListPage } from './view-question-list';

@NgModule({
  declarations: [
    ViewQuestionListPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQuestionListPage),
  ],
})
export class ViewQuestionListPageModule {}
