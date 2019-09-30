import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
// import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';

@IonicPage()
@Component({
  selector: 'page-excluir-admin',
  templateUrl: 'excluir-admin.html',
})
export class ExcluirAdminPage {

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
  totalAdmin;
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
      this.totalAdmin = 0;
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Administrador'){
          this.totalAdmin++;
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

  deletaAdmin(){
    if(this.totalAdmin <= 1){
      const alert = this.alertCtrl.create({
        subTitle: 'Exclusão de Administrador',
        message: 'Você está tentando excluir o único Administrador do Sistema. Não será possível continuar.',
        buttons: ['Ok']});
        alert.present();
    }else{
      const loading = this.loadingCtrl.create({
        content: 'Excluindo...'
      });
      setTimeout( () => { this.dbService.excluiAdmin(this.usuarioKey) }, 10000);
      loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Exclusão de Administrador',
                        message: 'Administrador excluído com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                    .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Exclusão de Administrador falhou',
                        message: error.message,
                        buttons: ['Ok']});
                      alert.present();});
    }
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}