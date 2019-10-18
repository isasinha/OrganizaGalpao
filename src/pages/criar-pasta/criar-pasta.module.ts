import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarPastaPage } from './criar-pasta';

@NgModule({
  declarations: [
    CriarPastaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarPastaPage),
  ],
})
export class CriarPastaPageModule {}
