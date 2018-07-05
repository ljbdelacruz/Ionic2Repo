import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQuizInfoPage } from './view-quiz-info';

@NgModule({
  declarations: [
    ViewQuizInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQuizInfoPage),
  ],
})
export class ViewQuizInfoPageModule {}
