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
public keyPosicao = '';
public nomePosicao = '';
public observacao = '';
public observacaoBase = '';
refArm = firebase.database().ref('/armazenamento');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbService: FirebaseServiceProvider,
    public viewCtrl: ViewController
    ) {
    this.keyGalpao = this.navParams.get('keyGalpao');
    this.keyPosicao = this.navParams.get('keyPosicao');
    this.nomePosicao = this.navParams.get('nomeyPosicao');

    this.observacaoBase = '';
    const snapshotToArrayUsuarioCPFGalpao = snapshot => {
      snapshot.forEach(element => {
        let obs = element.val();
        // galpaoPosicao.key = element.key;
        this.observacaoBase = obs;
      });
      return this.observacaoBase;
    }
    this.refArm.child(this.keyGalpao+'/posicao/'+this.keyPosicao+'/observacao').on('value', resp => {
      this.observacao = '';
      this.observacao = snapshotToArrayUsuarioCPFGalpao(resp);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacaoPage');
  }

  salvar(novaObservacao){
    this.observacao = this.observacao + novaObservacao;
    this.dbService.cadastraObservacao(this.keyGalpao, this.keyPosicao, this.observacao);
    this.viewCtrl.dismiss();
  }

  descartar() {
    this.viewCtrl.dismiss();
  }
  
}
