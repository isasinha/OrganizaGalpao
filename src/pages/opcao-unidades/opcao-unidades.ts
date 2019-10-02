import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { CadastroUnidadePage } from '../cadastro-unidade/cadastro-unidade';
import { HomeAdmPage } from '../home-adm/home-adm';
import { ExcluirUnidadePage } from '../excluir-unidade/excluir-unidade';
import { AlterarUnidadePage } from '../alterar-unidade/alterar-unidade';
import { GalpoesPage } from '../galpoes/galpoes';

@IonicPage()
@Component({
  selector: 'page-opcao-unidades',
  templateUrl: 'opcao-unidades.html',
})
export class OpcaoUnidadesPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Cadastrar unidade', endereco: CadastroUnidadePage},
      {item: 'Excluir unidade', endereco: ExcluirUnidadePage},
      {item: 'Alterar unidade', endereco: AlterarUnidadePage},
      {item: 'Listar galpões por unidade', endereco: GalpoesPage}
    ];
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
