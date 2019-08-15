import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcluirUsuarioPage } from './excluir-usuario';

@NgModule({
  declarations: [
    ExcluirUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ExcluirUsuarioPage),
  ],
})
export class ExcluirUsuarioPageModule {}
