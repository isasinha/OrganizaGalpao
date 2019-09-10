import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, NavController } from 'ionic-angular';
import { AlterarUnidadePage } from '../alterar-unidade/alterar-unidade';
import { AlterarGalpaoPage } from '../alterar-galpao/alterar-galpao';

@IonicPage()
@Component({
  selector: 'page-modal-alterar-adm',
  templateUrl: 'modal-alterar-adm.html',
})
export class ModalAlterarAdmPage {
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
      {item: 'Dados da unidade', endereco: AlterarUnidadePage},
      {item: 'Dados do galpão', endereco: AlterarGalpaoPage}
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
