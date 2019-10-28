import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { ObservacaoPage } from '../observacao/observacao';
import { AddItemPage } from '../add-item/add-item';
import { CriarPastaPage } from '../criar-pasta/criar-pasta';
import * as firebase from 'firebase';
import { snapshotToArrayItens } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-manter-posicao',
  templateUrl: 'manter-posicao.html',
})
export class ManterPosicaoPage {

public keyGalpao = '';
public posicao = '';
public pastas = [];
public itens = [];
ref = firebase.database().ref('/armazenamento/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public dbService: FirebaseServiceProvider,
    private alertCtrl: AlertController
    ) {
    this.keyGalpao = this.navParams.get('galpao');
    this.posicao = this.navParams.get('posicao'); 

    const snapshotToArrayGalpao = snapshot => {
      let i = 0;
      let returnArray = [];
      let pastaKey;
      snapshot.forEach(element => {
        let pasta = element.val();
        pastaKey = element.key;
        if(pastaKey != 'observacao'){
          pasta.key = element.key;
          returnArray.push(pasta);
          this.ref.child(this.keyGalpao+'/posicao/'+this.posicao+'/'+pastaKey+'/itens/').on('value', resp => {
            this.itens = snapshotToArrayItens(resp);
          })
          returnArray[i].itens=(this.itens);
          i++;
        }
      });
      console.log(returnArray);
      return returnArray;      
    }

    this.ref.child(this.keyGalpao+'/posicao/'+this.posicao).on('value', resp => {
      this.pastas = snapshotToArrayGalpao(resp);
      console.log(this.pastas)
    })
  }

  ionViewDidLoad() {

  }

  criaPasta(){
    let posicaoModal = this.modalCtrl.create(CriarPastaPage, {
      keyGalpao: this.keyGalpao,
      posicao: this.posicao
    });
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  addItem(pastaKey: any){
    let posicaoModal = this.modalCtrl.create(AddItemPage, {
      keyGalpao: this.keyGalpao,
      posicao: this.posicao,
      pasta: pastaKey
    });
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  abreObs(){
    let posicaoModal = this.modalCtrl.create(ObservacaoPage, {
      keyGalpao: this.keyGalpao,
      posicao: this.posicao
    });
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  apagaItem(itemKey: any, pastaKey: any){
    const alert = this.alertCtrl.create({
      subTitle: 'Deseja excluir esse item?',
      message: 'Caso todos os itens sejam excluídos, a pasta também será excluída.',
      buttons: [{
        text: 'Não',
        handler: () => {}
      },
      {
        text: 'Sim',
        handler: () => {this.dbService.excluiItem(this.keyGalpao, this.posicao, pastaKey, itemKey);}
      }]});
    alert.present()
  }

  apagaPasta(pastaKey: any){
    const alert = this.alertCtrl.create({
      subTitle: 'Deseja excluir essa pasta?',
      message: 'Todos os itens cadastrados nesta pasta também serão excluídos.',
      buttons: [{
        text: 'Não',
        handler: () => {}
      },
      {
        text: 'Sim',
        handler: () => {this.dbService.excluiPasta(this.keyGalpao, this.posicao, pastaKey);}
      }]});
    alert.present()
  }
  
  
  voltar() {
    this.viewCtrl.dismiss();
  }

}
