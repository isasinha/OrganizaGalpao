import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeAdmPage } from './home-adm';

@NgModule({
  declarations: [
    HomeAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeAdmPage),
  ],
})
export class HomeAdmPageModule {}
