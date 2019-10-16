import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-manter-posicao',
  templateUrl: 'manter-posicao.html',
})
export class ManterPosicaoPage {

public keyGalpao = '';
public nomePosicao = '';
public keyPosicao = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.keyGalpao = this.navParams.get('galpao');
    this.keyPosicao = this.navParams.get('posicao');
    this.nomePosicao = this.navParams.get('nomePosicao');
  }

  ionViewDidLoad() {

  }

  descartar() {
    this.viewCtrl.dismiss();
  }

  salvar(){
    this.viewCtrl.dismiss();
  }

}
