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
  selector: 'page-unidade-galpao',
  templateUrl: 'excluir-unidade.html',
})
export class ExcluirUnidadePage {

  unidade: Unidade={
    nomeUnidade: '',
    galpao: null
  };
  galpao: Galpao = {
    unidade: '',
    nomeGalpao: '',
    largura: null,
    altura: null,
    profundidade: null,
    imagem: null
  };
  unidades = [];
  galpoes = [];
  keyGalpao;
  keyUnidade;
  refU = firebase.database().ref('/unidade');
  refG = firebase.database().ref('/galpao');

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

  deletaGalpao(unidade: Unidade){
    const loading = this.loadingCtrl.create({
      content: 'Excluindo...'
    });
    var nomeUni = this.unidade.nomeUnidade;
    var galpaoKey;
    const snapshotToArrayGalpao = snapshot => {
      snapshot.forEach(element => {
        let galpao = element.val();
        let unidadeGalpao = element.unidade;
        if(galpao.unidade == nomeUni){
          galpaoKey = element.key;
        }
      });
      return galpaoKey;
    }
    this.refG.on('value', resp => {
      this.keyGalpao = snapshotToArrayGalpao(resp);
    })
    var nomeUnidade = this.unidade.nomeUnidade;
    var unidadeKey;
    const snapshotToArrayUnidade = snapshot => {
      snapshot.forEach(element => {
        let unidadeLista = element.val();
        if(unidadeLista.nomeUnidade == nomeUnidade){
          unidadeKey = element.key;
        }
      });
      return unidadeKey;
    }
    this.refU.on('value', resp => {
      this.keyUnidade = snapshotToArrayUnidade(resp);
    })
    setTimeout( () => { this.dbService.excluiGalpao(this.keyGalpao) }, 10000);
    setTimeout( () => { this.dbService.excluiGalpaoUnidade(this.keyUnidade, this.galpao.nomeGalpao) }, 10000);
    loading.present().then((data) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Exclusão de Galpão',
                      message: 'Galpão excluído com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => {this.unidade.nomeUnidade = '',this.galpao.nomeGalpao = ''} )})
                  .catch((error) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Exclusão de galpão falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
    setTimeout( () => { 
    firebase.database().ref('/unidade/'+this.keyUnidade+'/unidadesGalpao').once("value", snapshot => {
      if (!snapshot.exists()){
        this.dbService.excluiUnidade(this.keyUnidade)
      }
    });}, 10000);
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
