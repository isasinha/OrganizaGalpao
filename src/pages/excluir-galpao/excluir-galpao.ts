import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-excluir-galpao',
  templateUrl: 'excluir-galpao.html',
})
export class ExcluirGalpaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcluirGalpaoPage');
  }

}
