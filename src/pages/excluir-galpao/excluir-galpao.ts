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
  selector: 'page-excluir-galpao',
  templateUrl: 'excluir-galpao.html',
})
export class ExcluirGalpaoPage {

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
    const snapshotToArrayGalpao = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let galpao = element.val();
        galpao.key = element.key;
        // if(galpao.key.unidade == nomeUnidade){
          returnArray.push(galpao); 
        // }
      });
      return returnArray;
    }
    this.refG.on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
    })
  }

  deletaGalpao(unidade: Unidade, galpao: Galpao){
    const loading = this.loadingCtrl.create({
      content: 'Excluindo...'
    });
    var nomeUnidade = this.galpao.unidade;
    var galpaoKey;
    const snapshotToArrayGalpao = snapshot => {
      snapshot.forEach(element => {
        let galpao = element.val();
        if(galpao.unidade == nomeUnidade){
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
        let unidade = element.val();
        if(unidade.nomeUnidade == nomeUnidade){
        unidadeKey = element.key;
        }
      });
      return unidadeKey;
    }
    this.refU.on('value', resp => {
      this.keyUnidade = snapshotToArrayUnidade(resp);
    })
    this.dbService.excluiGalpao(this.keyGalpao);
    this.dbService.excluiGalpaoUnidade(this.keyUnidade, this.galpao.nomeGalpao);    
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
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
