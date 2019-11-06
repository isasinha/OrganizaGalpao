import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-liberar-galpao',
  templateUrl: 'liberar-galpao.html',
})
export class LiberarGalpaoPage {


  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null,
    endereco: null,
    telefone: null
  };
  galpao: Galpao = {
    nomeGalpao: null,
    largura: null,
    altura: null,
    profundidade: null,
    imagem: null
  };
  unidades:Array<Unidade> = [];
  galpoes = [];
  galpaoSelecionado: Galpao;
  keyGalpao;
  keyUnidade;
  ref = firebase.database().ref('/unidade/');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
      
  }

  ionViewDidLoad() {
    this.ref.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }


  selecionaGalpao(keyUnidade: any){
    this.keyUnidade = keyUnidade;
    this.ref.child(keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
    })
  }

  exibirGalpaoSelecionado(keyGalpao: any){
    const snapshotToArrayGalpaoSelecionado = snapshot => {
      let returnArray: Galpao;
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key;
        if(galpao.key == keyGalpao){
          returnArray = galpao; 
        }
      });
      return returnArray;
    }
    this.ref.child(this.keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpaoSelecionado = snapshotToArrayGalpaoSelecionado(resp);
    })
  }
  
  liberaGalpao(keyUnidade: any, keyGalpao: any){
    const alert = this.alertCtrl.create({
      subTitle: 'Deseja liberar este galpão?',
      message: 'Atenção, todos os usuários e itens cadastrados serão excluidos. Essa ação não pode ser desfeita!',
      buttons: [{
      text: 'Não',
      handler: () => {}
      },
      {
      text: 'Sim',
      handler: () => {this.liberaGalpaoAdm(keyUnidade, keyGalpao);}
      }]});
    alert.present()
  }
 
  liberaGalpaoAdm(keyUnidade: any, keyGalpao: any){
    const loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();
    this.db.object('/armazenamento/'+keyGalpao).remove();
    this.dbService.cadastraGalpaoLiberar(this.galpaoSelecionado, keyGalpao);
    this.ref.child(keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/').on('value', snapshot => {
      snapshot.forEach(element => {
         let usuario = element.val();
         usuario.key = element.key;
         let keyUsuario = usuario.key;
         this.dbService.excluiIdentificacaoGalpaoUsuario(keyUsuario, keyGalpao);
      });
    })
    this.ref.child(keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/').remove();
    loading.dismiss();
    const alert = this.alertCtrl.create({
      subTitle: 'Galpão liberado com sucesso!',
      buttons: [{
      text: 'Ok',
      handler: () => {this.navCtrl.setRoot(HomeAdmPage);}
      }]});
    alert.present()
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}