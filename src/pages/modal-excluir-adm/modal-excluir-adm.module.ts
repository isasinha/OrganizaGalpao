import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalExcluirAdmPage } from './modal-excluir-adm';

@NgModule({
  declarations: [
    ModalExcluirAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalExcluirAdmPage),
  ],
})
export class ModalExcluirAdmPageModule {}
