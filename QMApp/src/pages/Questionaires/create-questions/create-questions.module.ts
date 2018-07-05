import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuestionsPage } from './create-questions';

@NgModule({
  declarations: [
    CreateQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQuestionsPage),
  ],
})
export class CreateQuestionsPageModule {}
