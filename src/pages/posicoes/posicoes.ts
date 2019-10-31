import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ManterPosicaoPage } from '../manter-posicao/manter-posicao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao } from '../../app/Modelo/galpao';

@IonicPage()
@Component({
  selector: 'page-posicoes',
  templateUrl: 'posicoes.html',
})
export class PosicoesPage {

  exemploImg =  'assets/imgs/exemploImg.jpg';

  public keyGalpao = '';
  public nomeUsuario: any = '';
  public keyUsuario: any = '';
  public cpfUsuario: any = '';
  public nomeGalpao: any = '';
  public nomeUnidade: any = '';
  public keyUnidade: any = '';
  public galpao: Galpao;
  opcaoSelecionada: any;
  public opcoes: Array<{posicao: string}>
  galpoesPosicoes = [];
  public posicoes: Array<any> = [];
  ref = firebase.database().ref('/armazenamento');
  refUni = firebase.database().ref('/unidade');
  public posicao = '';
  public posicaoKey = '';
  public busca = '';
  public imagem;

  public profundidade:number = 0;
  public altura:number = 0;
  public largura:number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      this.keyGalpao = navParams.get('keyGalpao');
      this.nomeUsuario = navParams.get('nome');
      this.keyUsuario = navParams.get('key'); 
      this.cpfUsuario = navParams.get('cpf');
      this.nomeGalpao = navParams.get('nomeGalpao');
      this.nomeUnidade = navParams.get('nomeUnidade');
      this.keyUnidade = navParams.get('keyUnidade');
      this.galpao = navParams.get('galpao');
      this.imagem = this.galpao.imagem;
  
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
  
      var medidas = this.dbService.geraPosicao(this.galpao);


      this.profundidade = medidas[0];
      this.altura = medidas[1];
      this.largura = medidas[2];
  
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

  liberarGalpao(){
    const alert = this.alertCtrl.create({
      subTitle: 'Deseja liberar este galpão?',
      message: 'Atenção, todos os itens cadastrados serão excluidos. Essa ação não pode ser desfeita!',
      buttons: [{
      text: 'Não',
      handler: () => {}
      },
      {
      text: 'Sim',
      handler: () => {this.liberarGalpaoUser();}
      }]});
    alert.present()
  }
  
  liberarGalpaoUser(){
    const loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();
    this.db.object('/armazenamento/'+this.keyGalpao).remove();
    const snapshotToArrayUnidadeKey = snapshot => {
      let returnArray = [];
      let unidadeKey = '';
      snapshot.forEach(element => {
        let unidade = element.val();
        unidade.key = element.key;
        unidadeKey = unidade.key;
  
        const snapshotToArrayGalpao = snapshot => {
          let outroArray = [];
          snapshot.forEach(element => {
             let galpao = element.val();
             galpao.key = element.key;
             if(galpao.key == this.keyGalpao){
              outroArray.push(galpao); 
              this.dbService.cadastraGalpaoLiberar(galpao, this.keyGalpao);
             }
          });
          return outroArray;
        }
        this.refUni.child(unidadeKey+'/unidadesGalpao/').on('value', resp => {
          this.posicoes = [];
          this.posicoes = snapshotToArrayGalpao(resp);
        })
  
      });
      return returnArray;
    }
  
    this.refUni.on('value', resp => {
      this.posicoes = [];
      this.posicoes = snapshotToArrayUnidadeKey(resp);
    })
    loading.dismiss(); 
    const alert = this.alertCtrl.create({
      subTitle: 'Galpão liberado com sucesso!',
      buttons: [{
      text: 'Ok',
      handler: () => {this.voltar();}
      }]});
    alert.present()
  }
  

  voltar(){
    this.navCtrl.setRoot(HomePage, {
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario
    })
  }

}
