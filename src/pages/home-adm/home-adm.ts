import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OpcaoUnidadesPage } from '../opcao-unidades/opcao-unidades';
import { OpcaoUsuariosPage } from '../opcao-usuarios/opcao-usuarios';
import { OpcaoGalpoesPage } from '../opcao-galpoes/opcao-galpoes';

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
      {item: 'Gestão Unidades', endereco: OpcaoUnidadesPage},
      {item: 'Gestão Galpões', endereco: OpcaoGalpoesPage},      
      {item: 'Gestão Usuários', endereco: OpcaoUsuariosPage}
    ];

  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.setRoot(opcao.endereco); 
  }

}

