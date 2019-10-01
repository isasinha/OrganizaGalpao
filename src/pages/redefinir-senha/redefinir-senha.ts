import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-redefinir-senha',
  templateUrl: 'redefinir-senha.html',
})
export class RedefinirSenhaPage {

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
  user = [];
  temUsuario = false;
  usuarioCpf;
  usuarioKey;
  confirmaSenha;
  refUser = firebase.database().ref('/usuario/');
    
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
    this.user = [];
    const snapshotToArrayUsuarioCPF = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioCpf == usuarioBanco.cpf){
          this.user = usuarioBanco;
          this.usuarioKey = usuarioBanco.key;
          this.temUsuario = true;
        }
      });
      return this.user;
    }
    this.refUser.on('value', resp => {
      this.usuarioSelecionado = [];
      this.temUsuario = false;
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
  }

  alteraUsuario(usuario: Usuario, confirmaSenha: string){
    const loading = this.loadingCtrl.create({
      content: 'Alterando...'
    });
    if(usuario.senha != confirmaSenha){
      loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
        subTitle: 'Senhas digitadas não conferem',
        message: 'Favor conferir as senhas digitadas e tentar novamente!',
        buttons: ['Ok']});
      alert.present()});
    }else{
      setTimeout( () => { this.dbService.editaUsuario(this.usuarioKey, usuario) }, 10000);
      loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Alteração de Usuário',
                        message: 'Senha alterada com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot('LoginPage'))})
                    .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Alteração de senha falhou',
                        message: error.message,
                        buttons: ['Ok']});
                      alert.present();});
    }                      
  }

  voltar(){
    this.navCtrl.setRoot(LoginPage)
  }

}