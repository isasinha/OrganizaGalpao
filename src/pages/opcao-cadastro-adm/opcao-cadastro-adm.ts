import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { CadastroGalpaoPage } from '../cadastro-galpao/cadastro-galpao';
import { CadastroUnidadePage } from '../cadastro-unidade/cadastro-unidade';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-opcao-cadastro-adm',
  templateUrl: 'opcao-cadastro-adm.html',
})
export class OpcaoCadastroAdmPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Novo usuário', endereco: CadastroUsuarioPage},
      {item: 'Nova unidade', endereco: CadastroUnidadePage},
      {item: 'Novo galpão', endereco: CadastroGalpaoPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
