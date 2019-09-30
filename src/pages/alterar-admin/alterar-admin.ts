import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';

@IonicPage()
@Component({
  selector: 'page-alterar-admin',
  templateUrl: 'alterar-admin.html',
})
export class AlterarAdminPage {

  usuario: Usuario = {
    nome: null,
    sobrenome: null,
    cpf: null,
    email: null,
    senha: null,
    tipo: null
  };

  usuarioSelecionado = [];
  usuarioDados = [];
  usuarioCpf;
  usuarioKey;
  ref = firebase.database().ref('/usuario/');
  
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
  }


  selecionaUsuario(usuarioCpf: any){
    const snapshotToArrayUsuarioCPF = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Administrador'){
          if(usuarioCpf == usuarioBanco.cpf){
            returnArray.push(usuarioBanco);
            this.usuarioKey = usuarioBanco.key;
          } 
        }
      });
      return returnArray;
    }
    this.ref.on('value', resp => {
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
  }

  alteraUsuario(usuario: Usuario){
    const loading = this.loadingCtrl.create({
      content: 'Alterando...'
    });
    setTimeout( () => { this.dbService.editaUsuario(this.usuarioKey, usuario) }, 10000);
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