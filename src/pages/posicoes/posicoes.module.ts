import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PosicoesPage } from './posicoes';

@NgModule({
  declarations: [
    PosicoesPage,
  ],
  imports: [
    IonicPageModule.forChild(PosicoesPage),
  ],
})
export class PosicoesPageModule {}
