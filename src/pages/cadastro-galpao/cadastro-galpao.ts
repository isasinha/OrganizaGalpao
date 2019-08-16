import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-cadastro-galpao',
  templateUrl: 'cadastro-galpao.html',
})
export class CadastroGalpaoPage {

  unidades: Array<{unidade: string}>
  galpao: string;
  tamanho: string;
  unidadeSelecionada: string ='';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.unidades = [
      {unidade: '401'},
      {unidade: '501'},
      {unidade: '601'},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroGalpaoPage');
  }

  cadastraGalpao(){

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
