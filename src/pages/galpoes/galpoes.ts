import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao, snapshotToArrayGalpaoKey } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-galpoes',
  templateUrl: 'galpoes.html',
})
export class GalpoesPage {

  unidade: Unidade ={
    nomeUnidade: null,
    endereco: null,
    telefone: null
  };
  galpao: Galpao = {
    nomeGalpao: null,
    largura: null,
    altura: null,
    profundidade: null
  }

  unidades: Array<Unidade> = [];
  galpoes = [];
  keyGalpoes = [];
  keyUsuarios = [];
  usuarios =[];
  keyUnidade;
  ref = firebase.database().ref('/unidade/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider
    ) {
  }

  ionViewDidLoad() {
    this.ref.on('value', resp => { 
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }

  listaGalpaoPorUnidade(keyUnidade: any){
    this.ref.child(keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
      this.keyGalpoes = snapshotToArrayGalpaoKey(resp);
    })
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
