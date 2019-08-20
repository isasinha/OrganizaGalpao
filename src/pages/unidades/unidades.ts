import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-unidades',
  templateUrl: 'unidades.html',
})
export class UnidadesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnidadesPage');
  }

  voltar(){
    this.navCtrl.pop()
  }

}
