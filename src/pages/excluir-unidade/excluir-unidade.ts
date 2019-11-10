import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-excluir-unidade',
  templateUrl: 'excluir-unidade.html',
})
export class ExcluirUnidadePage {

  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null,
    endereco: null,
    telefone: null
  };
  unidades:Array<Unidade> = [];
  keyUnidade;
  ref = firebase.database().ref('/unidade/'); 
  public unidadeForm: any;
  messageUnidade = '';
  erroUnidade = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.ref.on('value', resp => {
        this.unidades = snapshotToArrayUnidade(resp);
      })
      this.unidadeForm = fb.group({
        uni: ['', Validators.required]
      })
  }

  ionViewDidLoad() {

  }

  deletaUnidade(keyUnidade: any){
    const loading = this.loadingCtrl.create({
      content: 'Excluindo...'
    });
    let {uni} = this.unidadeForm.controls;
    if(!this.unidadeForm.valid){
      if(!uni.valid){
        this.erroUnidade = true;
        this.messageUnidade = 'UNIDADE DEVE SER SELECIONADA';
      }else{
        this.messageUnidade = '';
      }
    }else{
      this.dbService.excluiUnidade(keyUnidade);
      loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Exclusão de Unidade',
                        message: 'Unidade excluída com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                    .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Exclusão de unidade falhou',
                        message: error.message,
                        buttons: ['Ok']});
                      alert.present();});
      }
  }

  zeraErro(){
    this.erroUnidade = false;
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
