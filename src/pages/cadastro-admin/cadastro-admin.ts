import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import { AuthService } from '../../app/auth.service';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
// import { Unidade, Galpao, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
// import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';


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

  keyUsuario;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    // private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
  }

  ionViewDidLoad() {

  }

  addAdmin(usuario: Usuario){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
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

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
