import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
// import { Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { snapshotToArrayUnidadeKey, snapshotToArrayGalpaoKey } from '../../app/Modelo/galpao';

@IonicPage()
@Component({
  selector: 'page-alterar-usuario',
  templateUrl: 'alterar-usuario.html',
})
export class AlterarUsuarioPage {

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
  unidadesKey = [];
  galpoesKey = [];
  refUser = firebase.database().ref('/usuario/');
  refUni = firebase.database().ref('/unidade/');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {

  }

  ionViewDidLoad() {
    this.refUni.on('value', resp => {
      this.unidadesKey = snapshotToArrayUnidadeKey(resp);
    })
  }


  selecionaUsuario(usuarioCpf: any){
    const snapshotToArrayUsuarioCPF = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Usuario'){
          if(usuarioCpf == usuarioBanco.cpf){
            returnArray.push(usuarioBanco);
            this.usuarioKey = usuarioBanco.key;
          } 
        }
      });
      return returnArray;
    }
    this.refUser.on('value', resp => {
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
  }

  alteraUsuario(usuario: Usuario){
    var i = 0;
    var keyUni = '';
    while(i < this.unidadesKey.length){
      keyUni = this.unidadesKey[i];
      this.refUni.child(keyUni+'/unidadesGalpao/').on('value', resp => {
        this.galpoesKey = snapshotToArrayGalpaoKey(resp);
      })
      i++;
    }
    const loading = this.loadingCtrl.create({
      content: 'Alterando...'
    });
    setTimeout( () => { this.dbService.editaUsuario(this.usuarioKey, usuario) }, 10000);
    var j = 0;
    while(j < this.unidadesKey.length){
      var k = 0;
      var uniSeleKey = this.unidadesKey[j];
      j++;
      while(k < this.galpoesKey.length){
        var galSeleKey = this.galpoesKey[k];
        const snapshotToArrayUsuarioGalpao = snapshot => {
          snapshot.forEach(element => {
            let usuarioBanco = element.val();
            usuarioBanco.key = element.key;
            if(this.usuarioKey == usuarioBanco.key){
              this.dbService.editaGalpaoUsuario(uniSeleKey, galSeleKey, this.usuarioKey, usuario);
            } 
          });
        }
        this.refUni.child(uniSeleKey+'/unidadesGalpao/'+galSeleKey+'/usuarios/').on('value', resp => {
          snapshotToArrayUsuarioGalpao(resp);
        })
        k++;
      }
    }
    loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Alteração de Usuário',
                      message: 'Usuário alterado com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Alteração de usuário falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}