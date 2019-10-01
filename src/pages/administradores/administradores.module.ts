import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministradoresPage } from './administradores';

@NgModule({
  declarations: [
    AdministradoresPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministradoresPage),
  ],
})
export class AdministradoresPageModule {}
