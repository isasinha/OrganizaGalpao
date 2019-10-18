import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-criar-pasta',
  templateUrl: 'criar-pasta.html',
})
export class CriarPastaPage {

public keyGalpao = '';
public posicao = '';
public nomePosicao = '';
public pasta = '';
public item = '';
refArm = firebase.database().ref('/armazenamento');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbService: FirebaseServiceProvider,
    public viewCtrl: ViewController
    ) {
    this.keyGalpao = this.navParams.get('keyGalpao');
    this.posicao = this.navParams.get('posicao');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacaoPage');
  }

  salvar(){
    this.dbService.cadastraPasta(this.keyGalpao, this.posicao, this.pasta, this.item);
    this.viewCtrl.dismiss();
  }

  descartar() {
    this.viewCtrl.dismiss();
  }
  
}
