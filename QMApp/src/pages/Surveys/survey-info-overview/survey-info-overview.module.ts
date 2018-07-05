import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyInfoOverviewPage } from './survey-info-overview';

@NgModule({
  declarations: [
    SurveyInfoOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyInfoOverviewPage),
  ],
})
export class SurveyInfoOverviewPageModule {}
