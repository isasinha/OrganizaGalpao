import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Unidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CadastroGalpaoPage } from '../cadastro-galpao/cadastro-galpao';

@IonicPage()
@Component({
  selector: 'page-cadastro-unidade',
  templateUrl: 'cadastro-unidade.html',
})
export class CadastroUnidadePage {

  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null, 
    endereco: null,
    telefone: null
  };

  unidadeKey;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      
  }

  ionViewDidLoad(unidade: Unidade) {
  }

  addUnidade(unidade: Unidade){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.unidadeKey = this.dbService.cadastraUnidade(unidade);
    loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Unidade cadastrada com sucesso!',
                      message: 'Deseja cadastrar galpões nesta unidade?' ,
                      buttons: [{
                        text: 'Não',
                        handler: () => {const alertThen = this.alertCtrl.create({
                            subTitle: 'Cadastro de unidade',
                            message: 'Deseja cadastrar outra unidade?' ,
                            buttons: [{
                              text: 'Não',
                              handler: () => {this.navCtrl.setRoot('HomeAdmPage')}
                            },
                            {
                              text: 'Sim',
                              handler: () => {unidade.endereco='', unidade.nomeUnidade='', unidade.telefone=''}
                            }]
                          });
                        alertThen.present()}
                      },
                      {
                        text: 'Sim',
                        handler: () => {this.navCtrl.push(CadastroGalpaoPage, {unidadeKey: this.unidadeKey})}
                      }]
                    });
                    alert.present()})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Cadastro de unidade falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}