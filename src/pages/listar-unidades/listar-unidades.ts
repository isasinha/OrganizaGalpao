import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-listar-unidades',
  templateUrl: 'listar-unidades.html',
})
export class ListarUnidadesPage {

  unidade: Unidade ={
    nomeUnidade: null,
    endereco: null,
    telefone: null
  };

  unidades: Array<Unidade> = [];
  ref = firebase.database().ref('/unidade/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider
    ) {

  }

  ionViewDidEnter() {
    this.ref.on('value', resp => { 
      this.unidades = snapshotToArrayUnidade(resp);
    });
  }
  
  refresh(){

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
