import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-limpar-galpao',
  templateUrl: 'limpar-galpao.html',
})
export class LimparGalpaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LimparGalpaoPage');
  }

  limpaGalpao(){

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
