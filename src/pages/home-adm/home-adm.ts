import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LimparGalpaoPage } from '../limpar-galpao/limpar-galpao';
import { GalpoesPage } from '../galpoes/galpoes';
import { OpcaoAlterarAdmPage } from '../opcao-alterar-adm/opcao-alterar-adm';
import { OpcaoExcluirAdmPage } from '../opcao-excluir-adm/opcao-excluir-adm';
import { OpcaoCadastroAdmPage } from '../opcao-cadastro-adm/opcao-cadastro-adm';

@IonicPage()
@Component({
  selector: 'page-home-adm',
  templateUrl: 'home-adm.html',
})
export class HomeAdmPage {

  opcaoSelecionada: any;
  opcoes: Array<{item: string, endereco: any}>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Cadastrar', endereco: OpcaoCadastroAdmPage},
      {item: 'Listar galpões por unidade', endereco: GalpoesPage},
      {item: 'Alterar', endereco: OpcaoAlterarAdmPage},
      {item: 'Limpar galpão', endereco: LimparGalpaoPage},
      {item: 'Excluir', endereco: OpcaoExcluirAdmPage}
    ];

  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.setRoot(opcao.endereco); 
  }

}

