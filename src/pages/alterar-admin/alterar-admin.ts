import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { FormBuilder, Validators } from '@angular/forms';

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
  public usuarioForm: any;
  messageUsuario = '';
  erroUsuario = false;
  messageEmail = '';
  erroEmail = false;
  public usuarioCpfForm: any;
  messageUsuarioCpf = '';
  erroUsuarioCpf = false;
  semUsuario = false;
  messageSemUsuario = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.usuarioForm = fb.group({
        nome: null,
        sobrenome: null,
        email: ['', Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')],
        cpf: null
      })
      this.usuarioCpfForm = fb.group({
        cpf: ['', Validators.required]
      })
      
  }

  ionViewDidLoad() {
  }


  selecionaUsuario(usuarioCpf: any){
    this.semUsuario = false;
    this.erroUsuarioCpf = false;
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
    this.semUsuario = false;
    let {cpf} = this.usuarioCpfForm.controls;
    if(!this.usuarioCpfForm.valid){
      if(!cpf.valid){
        this.erroUsuarioCpf = true;
        this.messageUsuarioCpf = 'CPF DEVE SER PREENCHIDO';
      }else{
        this.messageUsuarioCpf = '';
      }
    }else if(this.usuarioSelecionado.length <= 0){
      this.messageUsuarioCpf = '';
      this.semUsuario = true;
      this.messageSemUsuario = 'NENHUM ADMINISTRADOR ENCONTRADO COM ESSE CPF';
    }else{
      this.messageUsuarioCpf = '';
      let {nome, sobrenome, email, cpf} = this.usuarioForm.controls;
      if(!this.usuarioForm.valid){
        if(!email.valid){
          this.erroEmail = true;
          this.messageEmail = 'E-MAIL DEVE SER PREENCHIDO NO FORMATO: nome@email.com';
        }else{
          this.messageEmail = '';
        }
      }else{
        this.messageUsuarioCpf = '';
        if(!nome.value && !sobrenome.value && !email.value && !cpf.value){
          this.usuarioForm.status = 'INVALID';
          if(!this.usuarioForm.valid){
            this.erroUsuario = true;
            this.messageUsuario = 'AO MENOS 1 ITEM DEVE SER ALTERADO';
          }else{
            this.messageUsuario = '';
          }
        }else{
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
      }
    }
  }

//*****************************Descomentar para alterar a função já existente ***********************************/
//
//||  alteraUsuario(usuario: Usuario){
//||    const loading = this.loadingCtrl.create({
//||      content: 'Alterando...'
//||    });
//||    loading.present();
//||    this.dbService.editaUsuario(this.usuarioKey, usuario).subscribe(
//||      () => {
//||      loading.dismiss();
//||      const alert = this.alertCtrl.create({
//||        subTitle: 'Alteração de Usuário',
//||        message: 'Usuário alterado com sucesso!',
//||        buttons: ['Ok']});
//||      alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))
//||      }, 
//||      (error) =>{
//||        loading.dismiss(); 
//||        const alert = this.alertCtrl.create({
//||          subTitle: 'Alteração de usuário falhou',
//||          message: error.message,
//||          buttons: ['Ok']});
//||        alert.present();
//||      }
//||    );
//||  }


  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}