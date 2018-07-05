import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTransactionsPage } from './user-transactions';

@NgModule({
  declarations: [
    UserTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTransactionsPage),
  ],
})
export class UserTransactionsPageModule {}
