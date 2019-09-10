import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, NavController } from 'ionic-angular';
import { ExcluirUsuarioPage } from '../excluir-usuario/excluir-usuario';
import { ExcluirGalpaoPage } from '../excluir-galpao/excluir-galpao';
import { ExcluirUnidadePage } from '../excluir-unidade/excluir-unidade';

@IonicPage()
@Component({
  selector: 'page-modal-excluir-adm',
  templateUrl: 'modal-excluir-adm.html',
})
export class ModalExcluirAdmPage {
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
      {item: 'Galpão', endereco: ExcluirGalpaoPage},
      {item: 'Unidade', endereco: ExcluirUnidadePage},
      {item: 'Usuário', endereco: ExcluirUsuarioPage}
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
