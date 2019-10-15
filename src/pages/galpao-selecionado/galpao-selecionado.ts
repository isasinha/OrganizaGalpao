import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-galpao-selecionado',
  templateUrl: 'galpao-selecionado.html',
})
export class GalpaoSelecionadoPage {

  public keyGalpao = '';
  public nomeUsuario: any = '';
  public keyUsuario: any = '';
  public cpfUsuario: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keyGalpao = navParams.get('keyGalpao');
    this.nomeUsuario = navParams.get('nome');
    this.keyUsuario = navParams.get('key'); 
    this.cpfUsuario = navParams.get('cpf');     
  }

  ionViewDidLoad() {

  }

  voltar(){
    this.navCtrl.setRoot(HomePage, {
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario
    })
  }

}
