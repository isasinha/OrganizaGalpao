import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-cadastro-galpao',
  templateUrl: 'cadastro-galpao.html',
})
export class CadastroGalpaoPage {

  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null, 
    endereco: null,
    telefone: null
  };
  galpao: Galpao = {
    nomeGalpao: null,
    largura: null,
    altura: null,
    profundidade: null,
    imagem: null
  };
  unidades = [];
  ref = firebase.database().ref('/unidade');
  keyU;
  qtdeGalpoes = null;
  galpoes = [];
  nomeGalpao;
  nomesGalpao = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      if(navParams.get('unidadeKey') == '')
        this.keyU = null;
      else
        this.keyU = navParams.get('unidadeKey');
  }

  ionViewDidLoad() {
    this.ref.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }

  geraArrayGalpoes(qtdeGalpoes){
    var cont= 0;
    this.galpoes = [];
    while(qtdeGalpoes > cont){
      this.galpoes.push(this.galpao);
      cont = cont + 1;
    }
  }


  addGalpao(nomesGalpao: any, galpao: Galpao, novaKey: any){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.dbService.cadastraGalpao(novaKey, galpao, nomesGalpao);
    loading.present().then((data) => { loading.dismiss(); const alert = this.alertCtrl.create({
                      title: 'Cadastro de galpão',
                      message: 'Galpão cadastrado com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      title: 'Cadastro de galpão falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();})
  }

  addGalpaoUni(nomesGalpao:any, galpao: Galpao){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.dbService.cadastraGalpao(this.keyU, galpao, nomesGalpao);
    loading.present().then((data) => { loading.dismiss(); const alert = this.alertCtrl.create({
                      title: 'Cadastro de galpão',
                      message: 'Galpão cadastrado com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      title: 'Cadastro de galpão falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();})
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}