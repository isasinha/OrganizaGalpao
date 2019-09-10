import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarUnidadesPage } from './listar-unidades';

@NgModule({
  declarations: [
    ListarUnidadesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarUnidadesPage),
  ],
})
export class ListarUnidadesPageModule {}
