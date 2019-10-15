import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';
import { GalpaoSelecionadoPage } from '../galpao-selecionado/galpao-selecionado';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nomeUsuario: any = '';
  public keyUsuario: any = '';
  public cpfUsuario: any = '';
  opcaoSelecionada: any;
  public opcoes: Array<{unidade: string, galpao: any, keyGalpao: any}>
  galpoesUser = [];
  public usuarioSelecionadoGalpao = [];
  refUser = firebase.database().ref('/usuario/');
  public userGalpao = '';
  public userUnidade = '';
  public userGalpaoKey = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    // public firebaseauth: AngularFireAuth
    ) {
    //   firebaseauth.user.subscribe((data => {
    //     this.user = data;
    // }
    // ));
    this.nomeUsuario = navParams.get('nome');
    this.keyUsuario = navParams.get('key'); 
    this.cpfUsuario = navParams.get('cpf'); 

    this.galpoesUser = [];
    const snapshotToArrayUsuarioCPFGalpao = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        this.galpoesUser.push(usuarioBanco.Unidade);
        this.galpoesUser.push(usuarioBanco.Galpao);
        this.galpoesUser.push(element.key);
      });
      return this.galpoesUser;
    }
    this.refUser.child(this.keyUsuario+'/Galpao/').on('value', resp => {
      this.usuarioSelecionadoGalpao = [];
      this.usuarioSelecionadoGalpao = snapshotToArrayUsuarioCPFGalpao(resp);
    })


    this.opcaoSelecionada = navParams.get('opcao');
    var i = 0;
    this.opcoes = [];
    while (i < this.usuarioSelecionadoGalpao.length){
      var j = i+1;
      var k = j+1;
      this.userGalpao = this.usuarioSelecionadoGalpao[i];
      this.userUnidade = this.usuarioSelecionadoGalpao[j];
      this.userGalpaoKey = this.usuarioSelecionadoGalpao[k];
      this.opcoes.push({unidade: this.userUnidade, galpao: this.userGalpao, keyGalpao: this.userGalpaoKey})  
      i = k+1;
    }
  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.setRoot(GalpaoSelecionadoPage, ({
      keyGalpao: opcao.keyGalpao, 
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario})); 
  }

  selecionaUsuarioGalpao(){
    this.galpoesUser = [];
    const snapshotToArrayUsuarioCPFGalpao = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        this.galpoesUser.push(usuarioBanco.unidade);
        this.galpoesUser.push(usuarioBanco.galpao);
        this.galpoesUser.push(usuarioBanco.key);
      });
      return this.galpoesUser;
    }
    this.refUser.child(this.keyUsuario+'/Galpao/').on('value', resp => {
      this.usuarioSelecionadoGalpao = [];
      this.usuarioSelecionadoGalpao = snapshotToArrayUsuarioCPFGalpao(resp);
    })
  }

}
