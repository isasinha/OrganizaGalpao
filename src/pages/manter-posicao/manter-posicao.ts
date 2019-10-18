import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ObservacaoPage } from '../observacao/observacao';
import { AddItemPage } from '../add-item/add-item';
import { CriarPastaPage } from '../criar-pasta/criar-pasta';

@IonicPage()
@Component({
  selector: 'page-manter-posicao',
  templateUrl: 'manter-posicao.html',
})
export class ManterPosicaoPage {

public keyGalpao = '';
public nomePosicao = '';
public keyPosicao = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
    ) {
    this.keyGalpao = this.navParams.get('galpao');
    this.keyPosicao = this.navParams.get('posicao');
    this.nomePosicao = this.navParams.get('nomePosicao');
  }

  ionViewDidLoad() {

  }

  criaPasta(){
    let posicaoModal = this.modalCtrl.create(CriarPastaPage, {
      keyGalpao: this.keyGalpao,
      keyPosicao: this.keyPosicao
    });
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  addItem(){
    let posicaoModal = this.modalCtrl.create(AddItemPage, {
      //passar a pasta como parâmetro
    });
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  abreObs(){
    let posicaoModal = this.modalCtrl.create(ObservacaoPage, {
      keyGalpao: this.keyGalpao,
      keyPosicao: this.keyPosicao,
      nomePosicao: this.nomePosicao
    });
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  descartar() {
    this.viewCtrl.dismiss();
  }

  salvar(){
    this.viewCtrl.dismiss();
  }

}
