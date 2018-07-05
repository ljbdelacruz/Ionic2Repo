import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerQuizPage } from './answer-quiz';

@NgModule({
  declarations: [
    AnswerQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(AnswerQuizPage),
  ],
})
export class AnswerQuizPageModule {}
