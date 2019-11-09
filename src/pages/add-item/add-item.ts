import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';

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
public itemForm: any;
messageItem = '';
erroItem = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbService: FirebaseServiceProvider,
    public viewCtrl: ViewController,
    public fb: FormBuilder
    ) {
    this.keyGalpao = this.navParams.get('keyGalpao');
    this.posicao = this.navParams.get('posicao');
    this.keyPasta = this.navParams.get('pasta');
    this.itemForm = fb.group({
      itemF: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacaoPage');
  }

  salvar(){
    let {itemF} = this.itemForm.controls;
    if(!this.itemForm.valid){
      if(!itemF.valid){
        this.erroItem = true;
        this.messageItem = 'NOME DO ITEM DEVE SER PREENCHIDO';
      }else{
        this.messageItem = '';
      }
    }else{
    this.dbService.cadastraItem(this.keyGalpao, this.posicao, this.keyPasta, this.item);
    this.viewCtrl.dismiss();
    }
  }

  descartar() {
    this.viewCtrl.dismiss();
  }
  
}
