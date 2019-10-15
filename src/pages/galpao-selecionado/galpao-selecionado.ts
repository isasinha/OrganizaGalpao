import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

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
  public nomeGalpao: any = '';
  opcaoSelecionada: any;
  public opcoes: Array<{posicao: string}>
  galpoesPosicoes = [];
  public posicoes = [];
  ref = firebase.database().ref('/armazenamento');
  public posicao = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keyGalpao = navParams.get('keyGalpao');
    this.nomeUsuario = navParams.get('nome');
    this.keyUsuario = navParams.get('key'); 
    this.cpfUsuario = navParams.get('cpf');
    this.nomeGalpao = navParams.get('galpao');
    
      //   firebaseauth.user.subscribe((data => {
      //     this.user = data;
      // }
      // ));
      this.nomeUsuario = navParams.get('nome');
      this.keyUsuario = navParams.get('key'); 
      this.cpfUsuario = navParams.get('cpf'); 
  
      this.galpoesPosicoes = [];
      const snapshotToArrayUsuarioCPFGalpao = snapshot => {
        snapshot.forEach(element => {
          let galpaoPosicao = element.val();
          this.galpoesPosicoes = galpaoPosicao;
        });
        return this.galpoesPosicoes;
      }
      this.ref.child(this.keyGalpao).on('value', resp => {
        this.posicoes = [];
        this.posicoes = snapshotToArrayUsuarioCPFGalpao(resp);
      })
  
  
      this.opcaoSelecionada = navParams.get('opcao');
      var i = 0;
      this.opcoes = [];
      while (i < this.posicoes.length){    //verificar esse trecho
        this.posicao = this.posicoes[i];
        this.opcoes.push({posicao: this.posicao})  
        i = i+1;
      }
    }
  
    opcaoEscolhida(event, opcao){     //criar um modal
      this.navCtrl.setRoot(GalpaoSelecionadoPage, ({
        keyGalpao: opcao.keyGalpao, 
        key: this.keyUsuario,
        nome: this.nomeUsuario,
        cpf: this.cpfUsuario})); 
    }

  ionViewDidLoad() {

  }

  voltar(){    //definir
    this.navCtrl.setRoot(HomePage, {
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario
    })
  }

}
