import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { AlterarUnidadePage } from '../alterar-unidade/alterar-unidade';
import { AlterarGalpaoPage } from '../alterar-galpao/alterar-galpao';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-opcao-alterar-adm',
  templateUrl: 'opcao-alterar-adm.html',
})
export class OpcaoAlterarAdmPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor( 
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Dados da unidade', endereco: AlterarUnidadePage},
      {item: 'Dados do galpão', endereco: AlterarGalpaoPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
