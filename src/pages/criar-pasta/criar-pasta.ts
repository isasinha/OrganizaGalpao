import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';

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
public pastaForm: any;
messagePasta = '';
erroPasta = false;
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
    this.pastaForm = fb.group({
      pastaF: ['', Validators.required],
      itemF: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacaoPage');
  }

  salvar(){
    let {pastaF, itemF} = this.pastaForm.controls;
    if(!this.pastaForm.valid){
      if(!pastaF.valid){
        this.erroPasta = true;
        this.messagePasta = 'NOME DA PASTA DEVE SER PREENCHIDO';
      }else{
        this.messagePasta = '';
      }
      if(!itemF.valid){
        this.erroItem = true;
        this.messageItem = 'NOME DO ITEM DEVE SER PREENCHIDO';
      }else{
        this.messageItem = '';
      }
    }else{
    this.dbService.cadastraPasta(this.keyGalpao, this.posicao, this.pasta, this.item);
    this.viewCtrl.dismiss();
    }
  }

  descartar() {
    this.viewCtrl.dismiss();
  }
  
}
