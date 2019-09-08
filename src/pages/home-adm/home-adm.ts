import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { ExcluirUsuarioPage } from '../excluir-usuario/excluir-usuario';
import { CadastroGalpaoPage } from '../cadastro-galpao/cadastro-galpao';
import { LimparGalpaoPage } from '../limpar-galpao/limpar-galpao';
import { ExcluirGalpaoPage } from '../excluir-galpao/excluir-galpao';
import { ExcluirUnidadePage } from '../excluir-unidade/excluir-unidade';
import { CadastroUnidadePage } from '../cadastro-unidade/cadastro-unidade';

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
        {item: 'Cadastrar nova unidade', endereco: CadastroUnidadePage},
        {item: 'Cadastrar novo galpão', endereco: CadastroGalpaoPage},
        {item: 'Limpar galpão', endereco: LimparGalpaoPage},
        {item: 'Excluir galpão', endereco: ExcluirGalpaoPage},
        {item: 'Excluir unidade', endereco: ExcluirUnidadePage},
        {item: 'Excluir usuário', endereco: ExcluirUsuarioPage}
      ];

  }

  ionViewDidLoad() {

  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

}

