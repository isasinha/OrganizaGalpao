import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ExcluirGalpaoPage } from '../excluir-galpao/excluir-galpao';
import { HomeAdmPage } from '../home-adm/home-adm';
import { CadastroGalpaoPage } from '../cadastro-galpao/cadastro-galpao';
import { AlterarGalpaoPage } from '../alterar-galpao/alterar-galpao';
import { LimparGalpaoPage } from '../limpar-galpao/limpar-galpao';

@IonicPage()
@Component({
  selector: 'page-opcao-galpoes',
  templateUrl: 'opcao-galpoes.html',
})
export class OpcaoGalpoesPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Cadastrar galpão', endereco: CadastroGalpaoPage},
      {item: 'Excluir galpão', endereco: ExcluirGalpaoPage},
      {item: 'Alterar galpão', endereco: AlterarGalpaoPage},
      {item: 'Limpar galpão', endereco: LimparGalpaoPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
