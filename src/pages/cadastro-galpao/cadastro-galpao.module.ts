import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroGalpaoPage } from './cadastro-galpao';

@NgModule({
  declarations: [
    CadastroGalpaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroGalpaoPage),
  ],
})
export class CadastroGalpaoPageModule {}
