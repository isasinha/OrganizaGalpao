import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAlterarAdmPage } from './modal-alterar-adm';

@NgModule({
  declarations: [
    ModalAlterarAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAlterarAdmPage),
  ],
})
export class ModalAlterarAdmPageModule {}
