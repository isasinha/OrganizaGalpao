import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import { AuthService } from '../../app/auth.service';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
// import { Unidade, Galpao, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-cadastro-admin',
  templateUrl: 'cadastro-admin.html',
})
export class CadastroAdminPage {

  usuario: Usuario = {
    nome: '', 
    sobrenome: '',
    cpf: '',
    senha: '12345678',
    tipo: 'Administrador', 
    email: ''
  }

  user = [];
  usuarioKey;
  usuarioSelecionado = [];
  temUsuario = false;
  refUser = firebase.database().ref('/usuario/');
  public usuarioForm: any;
  messageNome = '';
  erroNome = false;
  messageSobrenome = '';
  erroSobrenome = false;
  messageEmail = '';
  erroEmail = false;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    // private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.usuarioForm = fb.group({
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]]
      })
  }

  ionViewDidLoad() {

  }

  selecionaUsuario(usuarioCpf: any){
    this.user = [];
    const snapshotToArrayUsuarioCPF = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Administrador'){
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
  }

  addAdmin(usuario: Usuario){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    let {nome, sobrenome, email} = this.usuarioForm.controls;
    if(!this.usuarioForm.valid){
      if(!nome.valid){
        this.erroNome = true;
        this.messageNome = 'NOME DEVE SER PREENCHIDO';
      }else{
        this.messageNome = '';
      }
      if(!sobrenome.valid){
        this.erroSobrenome = true;
        this.messageSobrenome = 'SOBRENOME DEVE SER PREENCHIDO';
      }else{
        this.messageSobrenome = '';
      }
      if(!email.valid){
        this.erroEmail = true;
        this.messageEmail = 'E-MAIL DEVE SER PREENCHIDO NO FORMATO: nome@email.com';
      }else{
        this.messageEmail = '';
      }
    }else{
    this.dbService.cadastraUsuario(this.usuario)
    loading.present().then((data) => {
                      loading.dismiss();
                      const alert = this.alertCtrl.create({
                        title: 'Cadastro de usuário',
                        message: 'Usuário cadastrado com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot(HomeAdmPage))})
                    .catch((error) => {
                      loading.dismiss();
                      const alert = this.alertCtrl.create({
                        title: 'Cadastro de usuário falhou',
                        message: 'Houve um erro ao tentar cadastrar o usuário, tente novamente.',
                        buttons: ['Ok']});
                      alert.present();})
    }
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
