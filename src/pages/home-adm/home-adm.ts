import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { ExcluirUsuarioPage } from '../excluir-usuario/excluir-usuario';
import { CadastroGalpaoPage } from '../cadastro-galpao/cadastro-galpao';
import { LimparGalpaoPage } from '../limpar-galpao/limpar-galpao';
import { ExcluirGalpaoPage } from '../excluir-galpao/excluir-galpao';

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
        {item: 'Cadastrar novo usuário', endereco: CadastroUsuarioPage},
        {item: 'Excluir usuário existente', endereco: ExcluirUsuarioPage},
        {item: 'Cadastrar novo galpão', endereco: CadastroGalpaoPage},
        {item: 'Limpar galpão', endereco: LimparGalpaoPage},
        {item: 'Excluir galpão', endereco: ExcluirGalpaoPage}
      ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdmPage');
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.pop();
  }

}

