import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcaoGestaoAdminPage } from './opcao-gestao-admin';

@NgModule({
  declarations: [
    OpcaoGestaoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(OpcaoGestaoAdminPage),
  ],
})
export class OpcaoGestaoAdminPageModule {}
