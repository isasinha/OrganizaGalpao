import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

public keyGalpao = '';
public keyPasta = '';
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
    this.keyPasta = this.navParams.get('pasta');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacaoPage');
  }

  salvar(){
    this.dbService.cadastraItem(this.keyGalpao, this.posicao, this.keyPasta, this.item);
    this.viewCtrl.dismiss();
  }

  descartar() {
    this.viewCtrl.dismiss();
  }
  
}
