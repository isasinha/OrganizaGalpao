import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LimparGalpaoPage } from '../limpar-galpao/limpar-galpao';

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
    public navParams: NavParams,
    private modal: ModalController
  ) {
  
    this.opcaoSelecionada = navParams.get('opcao');
    this.opcoes = [
      {item: 'Cadastrar', endereco: 'ModalCadastroAdmPage'},
      {item: 'Listar', endereco: 'ModalListarAdmPage'},
      {item: 'Alterar', endereco: 'ModalAlterarAdmPage'},
      {item: 'Limpar galpão', endereco: LimparGalpaoPage},
      {item: 'Excluir', endereco: 'ModalExcluirAdmPage'}
    ];

  }

  ionViewDidLoad() {

  }

  opcaoEscolhida(event, opcao){
    if(opcao.item == 'Limpar galpão'){
      this.navCtrl.push(opcao.endereco);
    }else{
      const myModal = this.modal.create(opcao.endereco)
      myModal.present();
    }
  }

}

