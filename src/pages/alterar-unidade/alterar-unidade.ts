import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-alterar-unidade',
  templateUrl: 'alterar-unidade.html',
})
export class AlterarUnidadePage {


  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null,
    endereco: null,
    telefone: null
  };

  unidades:Array<Unidade> = [];
  unidadeSelecionada =[];
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
      
  }

  ionViewDidLoad() {
    this.ref.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }


  exibirUnidadeSelecionada(keyUnidade: any){
    const snapshotToArrayGalpaoSelecionado = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let unidade = element.val();
         unidade.key = element.key;
        if(unidade.key == keyUnidade){
          returnArray.push(unidade); 
        }
      });
      return returnArray;
    }
    this.ref.on('value', resp => {
      this.unidadeSelecionada = snapshotToArrayGalpaoSelecionado(resp);
    })
  }

  alteraUnidade(keyUnidade: any, unidade: Unidade,){
    const loading = this.loadingCtrl.create({
      content: 'Alterando...'
    });
    setTimeout( () => { this.dbService.editaUnidade(keyUnidade, unidade) }, 10000);
    loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      title: 'Alteração de Unidade',
                      message: 'Unidade alterada com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      title: 'Alteração de unidade falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}