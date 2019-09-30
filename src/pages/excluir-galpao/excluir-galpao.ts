import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-excluir-galpao',
  templateUrl: 'excluir-galpao.html',
})
export class ExcluirGalpaoPage {

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
  unidades:Array<Unidade> = [];
  galpoes = [];
  keyGalpao;
  keyUnidade;
  ref = firebase.database().ref('/unidade/');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      this.ref.on('value', resp => { 
        this.unidades = snapshotToArrayUnidade(resp);
      })
  }

  ionViewDidLoad() {

  }

  selecionaGalpao(key: any){
    this.ref.child(key+'/unidadesGalpao/').on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
    })
  }

  deletaGalpao(keyUnidade: any, keyGalpao: any){
    const loading = this.loadingCtrl.create({
      content: 'Excluindo...'
    });
    setTimeout( () => { this.dbService.excluiGalpao(keyUnidade, keyGalpao) }, 10000);
    loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de Galpão',
                      message: 'Galpão excluído com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de galpão falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
