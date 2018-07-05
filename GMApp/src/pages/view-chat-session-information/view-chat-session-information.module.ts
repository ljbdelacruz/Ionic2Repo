import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewChatSessionInformationPage } from './view-chat-session-information';

@NgModule({
  declarations: [
    ViewChatSessionInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewChatSessionInformationPage),
  ],
})
export class ViewChatSessionInformationPageModule {}
