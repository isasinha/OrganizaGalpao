import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-excluir-usuario',
  templateUrl: 'excluir-usuario.html',
})
export class ExcluirUsuarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  excluiUsuario(){

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
