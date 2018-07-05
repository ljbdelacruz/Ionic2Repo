import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizTakersListPage } from './quiz-takers-list';

@NgModule({
  declarations: [
    QuizTakersListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizTakersListPage),
  ],
})
export class QuizTakersListPageModule {}
