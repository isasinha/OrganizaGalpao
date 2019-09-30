import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarUsuarioPage } from './alterar-usuario';

@NgModule({
  declarations: [
    AlterarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarUsuarioPage),
  ],
})
export class AlterarUsuarioPageModule {}
