import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-liberar-galpao',
  templateUrl: 'liberar-galpao.html',
})
export class LiberarGalpaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  limpaGalpao(){

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
