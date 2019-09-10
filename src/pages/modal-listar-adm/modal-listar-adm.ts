import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, NavController } from 'ionic-angular';
import { GalpoesPage } from '../galpoes/galpoes';
import { ListarUnidadesPage } from '../listar-unidades/listar-unidades';

@IonicPage()
@Component({
  selector: 'page-modal-listar-adm',
  templateUrl: 'modal-listar-adm.html',
})
export class ModalListarAdmPage {
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
      {item: 'Listar unidades', endereco: ListarUnidadesPage},
      {item: 'Listar galpões por unidade', endereco: GalpoesPage}
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
