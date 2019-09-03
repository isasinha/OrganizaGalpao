import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';

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
  unidades;
  unidadeSelecionada: Unidade;

  

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
    this.unidades = this.dbService.listaUnidades();
    console.log('unidades', this.unidades)
    // var obj = this.unidades; 
    // var result = Object.keys(obj).map(function(key) {
    //   return  obj[key];
    // });

    // console.log(result);
    
  }

  addGalpao(galpao: Galpao, unidade: Unidade){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();
    this.dbService.cadastraGalpao(this.galpao, this.unidadeSelecionada)
                  .then((data) => {
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

    }

  addUnidade(unidade: Unidade){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();
    this.dbService.cadastraUnidade(this.unidade)
                  .then((data) => {
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

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
