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
  public opcoes: Array<{posicao: string, posicaoKey: any}>
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
      const snapshotToArrayUsuarioCPFGalpao = snapshot => {
        snapshot.forEach(element => {
          let galpaoPosicao = element.val();
          // galpaoPosicao.key = element.key;
          this.galpoesPosicoes.push(galpaoPosicao);
          this.galpoesPosicoes.push(element.key);
        });
        return this.galpoesPosicoes;
      }
      this.ref.child(this.keyGalpao+'/posicao/').on('value', resp => {
        this.posicoes = [];
        this.posicoes = snapshotToArrayUsuarioCPFGalpao(resp);
      })
  
  
      this.opcaoSelecionada = navParams.get('opcao');
      var i = 0;
      this.opcoes = [];
      while (i < this.posicoes.length){
        var j = i + 1;
        this.posicao = this.posicoes[i];
        this.posicaoKey = this.posicoes[j];
        this.opcoes.push({posicao: this.posicao, posicaoKey: this.posicaoKey})  
        i = j+1;
      }
    }
  
  opcaoEscolhida(event, opcao){ 
    let posicaoModal = this.modalCtrl.create(ManterPosicaoPage, {
      posicao: opcao.posicaoKey, 
      galpao: this.keyGalpao,
      nomePosicao: opcao.posicao});
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
