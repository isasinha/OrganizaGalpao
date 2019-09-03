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
    unidade: '',
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
  ref = firebase.database().ref('/unidade');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      this.ref.on('value', resp => {
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
    this.dbService.alteraUnidade(this.galpao.unidade, this.galpao);                    
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
                    alert.present().then(r => this.unidade.unidade = '')})
                  .catch((error) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: 'Cadastro de unidade falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  // async pegaKey(unidadeSelecionada: Unidade){
  //   this.unidadeKey = this.unidadeSelecionada.key;
  // }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

  alteraUnidade(nomeUnidade: string, galpao: Galpao){
    this.db.list('/unidade').snapshotChanges().subscribe((res) => {
      res.forEach((element:any) => {
        if (element.payload.val().unidade == nomeUnidade){
          this.db.list('/unidade').update(element.key, {galpao:galpao})
        }
      })
    })
  }

}
