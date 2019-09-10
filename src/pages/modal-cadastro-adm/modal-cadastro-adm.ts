import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, NavController } from 'ionic-angular';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { CadastroGalpaoPage } from '../cadastro-galpao/cadastro-galpao';
import { CadastroUnidadePage } from '../cadastro-unidade/cadastro-unidade';

@IonicPage()
@Component({
  selector: 'page-modal-cadastro-adm',
  templateUrl: 'modal-cadastro-adm.html',
})
export class ModalCadastroAdmPage {
  opcoes: Array<{item: string, endereco: any}>
  opcaoSelecionada: any;

  constructor(
    private view: ViewController, 
    public navParams: NavParams,
    public modal: ModalController,
    public navCtrl: NavController
    ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Novo usuário', endereco: CadastroUsuarioPage},
      {item: 'Nova unidade', endereco: CadastroUnidadePage},
      {item: 'Novo galpão', endereco: CadastroGalpaoPage}
    ];
  }

  ionViewDidLoad() {

  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.push(opcao.endereco);
    this.view.dismiss();
  }

  closeModal(){
    this.view.dismiss();
  }

}
