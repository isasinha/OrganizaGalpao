import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ExcluirUsuarioPage } from '../excluir-usuario/excluir-usuario';
import { ExcluirGalpaoPage } from '../excluir-galpao/excluir-galpao';
import { ExcluirUnidadePage } from '../excluir-unidade/excluir-unidade';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-opcao-excluir-adm',
  templateUrl: 'opcao-excluir-adm.html',
})
export class OpcaoExcluirAdmPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Galpão', endereco: ExcluirGalpaoPage},
      {item: 'Unidade', endereco: ExcluirUnidadePage},
      {item: 'Usuário', endereco: ExcluirUsuarioPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
