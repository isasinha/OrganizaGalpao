import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarAdminPage } from './alterar-admin';

@NgModule({
  declarations: [
    AlterarAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarAdminPage),
  ],
})
export class AlterarAdminPageModule {}
