import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpaoKey, snapshotToArrayUsuario } from '../../app/Modelo/galpao';
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
    
    const snapshotToArrayGalpao = snapshot => {
      let i = 0;
      let returnArray = [];
      let galpaoKey;
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key;
         galpaoKey = galpao.key;
        returnArray.push(galpao);
        this.ref.child(keyUnidade+'/unidadesGalpao/'+galpaoKey+'/usuarios/').on('value', resp => {
          this.usuarios = snapshotToArrayUsuario(resp);
        })
        returnArray[i].usuarios=(this.usuarios);
        i++;
      });
      return returnArray;
    }

    this.ref.child(keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
      this.keyGalpoes = snapshotToArrayGalpaoKey(resp);
    })

  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
