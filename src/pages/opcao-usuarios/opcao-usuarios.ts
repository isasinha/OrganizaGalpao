import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ExcluirUsuarioPage } from '../excluir-usuario/excluir-usuario';
import { HomeAdmPage } from '../home-adm/home-adm';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { AlterarUsuarioPage } from '../alterar-usuario/alterar-usuario';
import { OpcaoGestaoAdminPage } from '../opcao-gestao-admin/opcao-gestao-admin';

@IonicPage()
@Component({
  selector: 'page-opcao-usuarios',
  templateUrl: 'opcao-usuarios.html',
})
export class OpcaoUsuariosPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Cadastrar usuário', endereco: CadastroUsuarioPage},
      {item: 'Excluir usuário', endereco: ExcluirUsuarioPage},
      {item: 'Alterar usuário', endereco: AlterarUsuarioPage},
      {item: 'Gestão de Administrador do Sistema', endereco: OpcaoGestaoAdminPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
