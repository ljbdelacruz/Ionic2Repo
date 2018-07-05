import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQuizListPage } from './view-quiz-list';

@NgModule({
  declarations: [
    ViewQuizListPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQuizListPage),
  ],
})
export class ViewQuizListPageModule {}
