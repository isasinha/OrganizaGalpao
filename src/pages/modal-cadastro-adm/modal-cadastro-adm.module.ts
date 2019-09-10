import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCadastroAdmPage } from './modal-cadastro-adm';

@NgModule({
  declarations: [
    ModalCadastroAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCadastroAdmPage),
  ],
})
export class ModalCadastroAdmPageModule {}
