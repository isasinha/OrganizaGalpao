import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';

@IonicPage()
@Component({
  selector: 'page-galpoes-por-usuario',
  templateUrl: 'galpoes-por-usuario.html',
})
export class GalpoesPorUsuarioPage {

  usuario: Usuario = {
    nome: null,
    sobrenome: null,
    cpf: null,
    email: null,
    senha: null,
    tipo: null
  };

  usuarioSelecionado = [];
  usuarioGalpaoSelecionado = [];
  usuarioDados = [];
  usuarioCpf;
  usuarioKey;
  galpoesUser = [];
  user = [];
  temUsuario = false;
  usuarioSelecionadoGalpao = [];
  refUser = firebase.database().ref('/usuario/');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {

  }

  ionViewDidLoad() {

  }


  selecionaUsuario(usuarioCpf: any){
    this.user = [];
    const snapshotToArrayUsuarioCPF = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Usuario'){
          if(usuarioCpf == usuarioBanco.cpf){
            this.user = usuarioBanco;
            this.usuarioKey = usuarioBanco.key;
            this.temUsuario = true;
          }
        }
      });
      return this.user;
    }
    this.refUser.on('value', resp => {
      this.usuarioSelecionado = [];
      this.temUsuario = false;
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
    this.selecionaUsuarioGalpao(usuarioCpf);
  }

  selecionaUsuarioGalpao(usuarioCpf: any){
    this.galpoesUser = [];
    const snapshotToArrayUsuarioCPFGalpao = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        this.galpoesUser.push(usuarioBanco)
      });
      return this.galpoesUser;
    }
    this.refUser.child(this.usuarioKey+'/Galpao/').on('value', resp => {
      this.usuarioSelecionadoGalpao = [];
      this.usuarioSelecionadoGalpao = snapshotToArrayUsuarioCPFGalpao(resp);
    })
  }

   voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}