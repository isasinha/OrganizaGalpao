import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalListarAdmPage } from './modal-listar-adm';

@NgModule({
  declarations: [
    ModalListarAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalListarAdmPage),
  ],
})
export class ModalListarAdmPageModule {}
