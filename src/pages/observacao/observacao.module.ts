import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObservacaoPage } from './observacao';

@NgModule({
  declarations: [
    ObservacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ObservacaoPage),
  ],
})
export class ObservacaoPageModule {}
