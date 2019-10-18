import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ManterPosicaoPage } from '../manter-posicao/manter-posicao';

@IonicPage()
@Component({
  selector: 'page-galpao-selecionado',
  templateUrl: 'galpao-selecionado.html',
})
export class GalpaoSelecionadoPage {

  public keyGalpao = '';
  public nomeUsuario: any = '';
  public keyUsuario: any = '';
  public cpfUsuario: any = '';
  public nomeGalpao: any = '';
  public nomeUnidade: any = '';
  opcaoSelecionada: any;
  public opcoes: Array<{posicao: string}>
  galpoesPosicoes = [];
  public posicoes: Array<any> = [];
  ref = firebase.database().ref('/armazenamento');
  public posicao = '';
  public posicaoKey = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
    ) {
      this.keyGalpao = navParams.get('keyGalpao');
      this.nomeUsuario = navParams.get('nome');
      this.keyUsuario = navParams.get('key'); 
      this.cpfUsuario = navParams.get('cpf');
      this.nomeGalpao = navParams.get('galpao');
      this.nomeUnidade = navParams.get('unidade');
  
      this.galpoesPosicoes = [];
      const snapshotToArrayPosicoes = snapshot => {
        snapshot.forEach(element => {
          let galpaoPosicao = element.val();
          galpaoPosicao.key = element.key;
          this.galpoesPosicoes.push(galpaoPosicao.key);
        });
        return this.galpoesPosicoes;
      }
      this.ref.child(this.keyGalpao+'/posicao/').on('value', resp => {
        this.posicoes = [];
        this.posicoes = snapshotToArrayPosicoes(resp);
      })
  
  
      this.opcaoSelecionada = navParams.get('opcao');
      var i = 0;
      this.opcoes = [];
      while (i < this.posicoes.length){
        this.posicao = this.posicoes[i];
        this.opcoes.push({posicao: this.posicao})  
        i = i+1;
      }
    }
  
  opcaoEscolhida(event, opcao){ 
    let posicaoModal = this.modalCtrl.create(ManterPosicaoPage, {
      galpao: this.keyGalpao,
      posicao: opcao.posicao});
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  ionViewDidLoad() {

  }

  voltar(){    //definir
    this.navCtrl.setRoot(HomePage, {
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario
    })
  }

}
