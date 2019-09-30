import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcluirAdminPage } from './excluir-admin';

@NgModule({
  declarations: [
    ExcluirAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ExcluirAdminPage),
  ],
})
export class ExcluirAdminPageModule {}
