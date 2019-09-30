import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { CadastroAdminPage } from '../cadastro-admin/cadastro-admin';
import { ExcluirAdminPage } from '../excluir-admin/excluir-admin';
import { AlterarAdminPage } from '../alterar-admin/alterar-admin';

@IonicPage()
@Component({
  selector: 'page-opcao-gestao-admin',
  templateUrl: 'opcao-gestao-admin.html',
})
export class OpcaoGestaoAdminPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Cadastrar Administrador', endereco: CadastroAdminPage},
      {item: 'Excluir Administrador', endereco: ExcluirAdminPage},
      {item: 'Alterar Administrador', endereco: AlterarAdminPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
