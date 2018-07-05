import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBlogPage } from './create-blog';

@NgModule({
  declarations: [
    CreateBlogPage
  ],
  imports: [
    IonicPageModule.forChild(CreateBlogPage),
  ],
})
export class CreateBlogPageModule {}
