import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-adm',
  templateUrl: 'home-adm.html',
})
export class HomeAdmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdmPage');
  }

  cadastraUsuario(){
    this.navCtrl.setRoot('CadastroUsuarioPage')
  }

}
