import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManterPosicaoPage } from './manter-posicao';

@NgModule({
  declarations: [
    ManterPosicaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManterPosicaoPage),
  ],
})
export class ManterPosicaoPageModule {}
