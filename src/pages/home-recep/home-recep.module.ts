import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeRecepPage } from './home-recep';

@NgModule({
  declarations: [
    HomeRecepPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeRecepPage),
  ],
})
export class HomeRecepPageModule {}
