import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMedicoPage } from './home-medico';

@NgModule({
  declarations: [
    HomeMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMedicoPage),
  ],
})
export class HomeMedicoPageModule {}
