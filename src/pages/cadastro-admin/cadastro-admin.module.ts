import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAdminPage } from './cadastro-admin';

@NgModule({
  declarations: [
    CadastroAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAdminPage),
  ],
})
export class CadastroAdminPageModule {}
