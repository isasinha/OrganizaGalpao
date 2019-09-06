import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.module';

@IonicPage()
@Component({
  selector: 'page-cadastro-galpao',
  templateUrl: 'cadastro-galpao.html',
})
export class CadastroGalpaoPage {

  unidade: Unidade={
    nomeUnidade: '',
    galpao: null
    //chave: null
  };
  galpao: Galpao = {
    unidade: '',
    nomeGalpao: '',
    largura: null,
    altura: null,
    profundidade: null,
    imagem: null
    //chave: null
  };
  unidades = [];
  refU = firebase.database().ref('/unidade');
  refG = firebase.database().ref('/galpao');
  keyG;
  keyU;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      this.refU.on('value', resp => {
        this.unidades = snapshotToArray(resp);
      })
  }

  ionViewDidLoad() {
   
  }

  addGalpao(galpao: Galpao){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.dbService.cadastraGalpao(this.galpao);
    loading.present().then((data) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Cadastro de galpão',
                      message: 'Galpão cadastrado com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot(HomeAdmPage))})
                  .catch((error) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Cadastro de galpão falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
    var nomeUnidade = this.galpao.unidade;
    var unidadeKey;
    const snapshotToArrayUnidade = snapshot => {
      snapshot.forEach(element => {
        let unidade = element.val();
        if(unidade.nomeUnidade == nomeUnidade){
          unidadeKey = element.key;
        }
      });
      return unidadeKey;
    }
    this.refU.on('value', resp => {
      this.keyU = snapshotToArrayUnidade(resp);
    })
    var nomeGalpao = this.galpao.nomeGalpao;
    var galpaoKey;
    const snapshotToArrayGalpao = snapshot => {
      snapshot.forEach(element => {
        let galpao = element.val();
        if(galpao.nomeGalpao == nomeGalpao){
        galpaoKey = element.key;
        }
      });
      return galpaoKey;
    }
    this.refG.on('value', resp => { 
      this.keyG = snapshotToArrayGalpao(resp);
    })
    setTimeout( () => { this.dbService.insereGalpaoUnidade(this.keyU, this.galpao) }, 10000);
  }

  addUnidade(unidade: Unidade){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.dbService.cadastraUnidade(this.unidade);
    loading.present().then((data) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Cadastro de unidade',
                      message: 'Unidade cadastrada com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.unidade.nomeUnidade = '')})
                  .catch((error) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Cadastro de unidade falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
