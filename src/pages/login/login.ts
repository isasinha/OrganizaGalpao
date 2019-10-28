import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import { AuthService } from '../../app/auth.service';
import { HomePage } from '../home/home';
import { HomeAdmPage } from '../home-adm/home-adm';
import { RedefinirSenhaPage } from '../redefinir-senha/redefinir-senha';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Usuario = {
    nome: '',
    sobrenome: '',
    cpf: '',
    senha: '',
    tipo: '',
    email: ''
  }
  usuarioSenha:string = '';
  usuarioTipo:string = '';
  usuarioNome:string = '';
  usuarioKey = '';
  usuarioData=[];
  ref = firebase.database().ref('/usuario/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // private authService: AuthService,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider
    ) { 
  }

  ionViewDidLoad() {

  }

  login(usuario: Usuario){

    const snapshotToArrayUsuarioCPF = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuario.cpf == usuarioBanco.cpf){
          returnArray.push(usuarioBanco.senha);
          returnArray.push(usuarioBanco.tipo);
          returnArray.push(usuarioBanco.nome);
          returnArray.push(usuarioBanco.key);
        } 
      });
      return returnArray;
    }
    this.ref.on('value', resp => {
      this.usuarioData = [];
      this.usuarioSenha = '';
      this.usuarioTipo = '';
      this.usuarioData = snapshotToArrayUsuarioCPF(resp);
      this.usuarioSenha = this.usuarioData[0];
      this.usuarioTipo = this.usuarioData[1];
      this.usuarioNome = this.usuarioData[2];
      this.usuarioKey = this.usuarioData[3];
    })
    const loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();
    if(usuario.cpf == '' || usuario.senha == ''){
      loading.dismiss(); 
      const alert = this.alertCtrl
      .create({
        subTitle:'Login falhou', 
        message: "CPF e senha devem estar preenchidos", 
        buttons:['Ok']
      });
      alert.present()
    }else{
      if(this.usuarioData.length <= 0){
        loading.dismiss(); 
        const alert = this.alertCtrl
        .create({
          subTitle:'Login falhou', 
          message: "Verifique o CPF e tente novamente", 
          buttons:['Ok']
        });
        alert.present()
      }else{
        if(usuario.senha == this.usuarioSenha){
          if (this.usuarioSenha == '12345678'){
            loading.dismiss();
            this.navCtrl.push(RedefinirSenhaPage);
          }else{
            loading.dismiss();
            if(this.usuarioTipo == 'Administrador')
              this.navCtrl.push(HomeAdmPage)
            else{
              this.navCtrl.push(HomePage, {
                key: this.usuarioKey,
                nome: this.usuarioNome,
                cpf: usuario.cpf
              })
            }  
          }  
        }else{
          loading.dismiss(); 
          const alert = this.alertCtrl
          .create({
            subTitle:'Login falhou', 
            message: "Verifique a senha e tente novamente", 
            buttons:['Ok']
          });
          alert.present()
        }
      }  
    }
  }

  redefineSenha(){
    this.navCtrl.setRoot(RedefinirSenhaPage);
  }

} 