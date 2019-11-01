import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
// import { ManterPosicaoPage } from '../manter-posicao/manter-posicao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { PosicoesPage } from '../posicoes/posicoes';

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
  public unidadeKey = '';
  public imagem;
  public galpao;
  ref = firebase.database().ref('/armazenamento');
  refUni = firebase.database().ref('/unidade');
  jsonData: any = [];
  filtro: any = [];
  searchTerm : any="";
  exemploImg =  'assets/imgs/exemploImg.jpg';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    // private loadingCtrl: LoadingController,
    // private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
  ) {
    this.keyGalpao = navParams.get('keyGalpao');
    this.nomeUsuario = navParams.get('nome');
    this.keyUsuario = navParams.get('key'); 
    this.cpfUsuario = navParams.get('cpf');
    this.nomeGalpao = navParams.get('galpao');
    this.nomeUnidade = navParams.get('unidade');

    this.ref.child(this.keyGalpao+'/posicao/').on('value', snapshot => {
      let buscaPosicaoKey = '';
      let buscaPastaKey = '';
      let buscaItemKey = '';
      let itemMesmo = '';
      let dado = {};
      let j = 0;
      snapshot.forEach(element => {
        let galpaoPosicao = element.val();
        buscaPosicaoKey = element.key;
        galpaoPosicao.key = element.key;   
        this.ref.child(this.keyGalpao+'/posicao/'+buscaPosicaoKey).on('value', snapshot => {
          snapshot.forEach(element => {
            let galpaoPasta = element.val();
            buscaPastaKey = element.key;
            if(buscaPastaKey != 'observacao'){ 
              galpaoPasta.key = element.key;
              this.ref.child(this.keyGalpao+'/posicao/'+buscaPosicaoKey+'/'+buscaPastaKey+'/itens/').on('value', snapshot => {
                snapshot.forEach(element => {
                  let galpaoItem = element.val();
                  galpaoItem.key = element.key;
                  buscaItemKey = element.key;
                  this.ref.child(this.keyGalpao+'/posicao/'+buscaPosicaoKey+'/'+buscaPastaKey+'/itens/'+buscaItemKey).on('value', snapshot => {
                    snapshot.forEach(element => {
                      let galpaoItemItem = element.val();
                      // galpaoItemItem.key = element.key;
                      itemMesmo = galpaoItemItem;
                      dado = {Posicao: buscaPosicaoKey, Pasta: buscaPastaKey, Item: itemMesmo}
                      this.jsonData[j]=dado
                      j++;
                    });
                  })
                });
              })
            }
          });
        })
      });
    });

    this.refUni.on('value', outrosnapshot => {
      this.unidadeKey = '';
      outrosnapshot.forEach(element => {
        let unidade = element.val();
        unidade.key = element.key;
        this.unidadeKey = unidade.key;
        this.refUni.child(this.unidadeKey+'/unidadesGalpao/').on('value', maissnapshot => {
          maissnapshot.forEach(element => {
             let galpao = element.val();
             galpao.key = element.key;
             if(galpao.key == this.keyGalpao){
              this.galpao = galpao; 
              this.imagem = galpao.imagem;
             }
          });
        })
      });
    })


  }

  ionViewDidLoad() {
  }

  filterItems(searchTerm){
    return this.filtro.filter((item) => {
      return item.Item.toLowerCase().includes(searchTerm.toLowerCase());
    });  
  }

  setFilteredItems(searchTerm) {
    this.filtro = this.jsonData;
    this.filtro = this.filterItems(searchTerm);
  }

  posicoes(){
    this.navCtrl.setRoot(PosicoesPage, ({
      keyGalpao: this.keyGalpao, 
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario,
      nomeGalpao: this.nomeGalpao,
      nomeUnidade: this.nomeUnidade,
      keyUnidade: this.unidadeKey,
      galpao: this.galpao
    })); 
  }
  

  voltar(){
    this.navCtrl.setRoot(HomePage, {
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario
    })
  }

}
