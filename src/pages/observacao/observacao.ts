import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-observacao',
  templateUrl: 'observacao.html',
})
export class ObservacaoPage {

public keyGalpao = '';
public posicao = '';
public nomePosicao = '';
public observacao = '';
public observacaoBase = '';
public observacaoBaseOutra = '';
refArm = firebase.database().ref('/armazenamento');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbService: FirebaseServiceProvider,
    public viewCtrl: ViewController
    ) {
    this.keyGalpao = this.navParams.get('keyGalpao');
    this.posicao = this.navParams.get('posicao');

    this.observacaoBase = '';
    const snapshotToArrayUsuarioCPFGalpao = snapshot => {
      snapshot.forEach(element => {
        let obs = element.val();
        // obs.key = element.key;
        this.observacaoBase = obs;
      });
      return this.observacaoBase;
    }
    this.refArm.child(this.keyGalpao+'/posicao/'+this.posicao+'/').on('value', resp => {
      this.observacao = '';
      this.observacao = snapshotToArrayUsuarioCPFGalpao(resp);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacaoPage');
  }

  salvar(){
    this.dbService.cadastraObservacao(this.keyGalpao, this.posicao, this.observacao);
    this.viewCtrl.dismiss();
  }

  descartar() {
    this.viewCtrl.dismiss();
  }
  
}
