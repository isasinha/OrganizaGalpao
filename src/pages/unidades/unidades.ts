import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { snapshotToArrayUnidade, Unidade } from '../../app/Modelo/galpao';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-unidades',
  templateUrl: 'unidades.html',
})
export class UnidadesPage {

  unidades:Array<Unidade> = [];
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
    //this.dbService.listaUnidade().push(this.unidades);

  }


  voltar(){
    this.navCtrl.pop()
  }

}
