import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-redefinir-senha',
  templateUrl: 'redefinir-senha.html',
})
export class RedefinirSenhaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  voltar(){
    this.navCtrl.setRoot(LoginPage)
  }


}
