import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
// import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { snapshotToArrayUnidadeKey, snapshotToArrayGalpaoKey, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
// import { UnidadesPage } from '../unidades/unidades';

@IonicPage()
@Component({
  selector: 'page-excluir-usuario',
  templateUrl: 'excluir-usuario.html',
})
export class ExcluirUsuarioPage {

  usuario: Usuario = {
    nome: null,
    sobrenome: null,
    cpf: null,
    email: null,
    senha: null,
    tipo: null
  };

  usuarioSelecionado = [];
  usuarioGalpaoSelecionado = [];
  usuarioDados = [];
  usuarioCpf;
  usuarioKey;
  unidadesExc=[];
  unidades = [];
  galpoes = [];
  unidadesKey = [];
  galpoesKey = [];
  unidadesNome = [];
  galpoesNome = [];
  unidadeGalpao = [];
  galpaoUnidade = [];
  mensagem:Array<any> = [];


  refUser = firebase.database().ref('/usuario/');
  refUni = firebase.database().ref('/unidade/');
  
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
    this.refUni.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp)
      this.unidadesKey = snapshotToArrayUnidadeKey(resp);
    })
  }


  selecionaUsuario(usuarioCpf: any){
    this.unidadeGalpao = [];
    this.galpaoUnidade = [];
    this.usuarioKey = [];
    this.mensagem = [];
    this.galpoesKey = [];
    this.galpoes = [];
    const snapshotToArrayUsuarioCPF = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Usuario'){
          if(usuarioCpf == usuarioBanco.cpf){
            returnArray.push(usuarioBanco);
            this.usuarioKey = usuarioBanco.key;
          } 
        }
      });
      return returnArray;
    }
    this.refUser.on('value', resp => {
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
    var i = 0;
    var keyUni = '';
    while(i < this.unidadesKey.length){
      keyUni = this.unidadesKey[i];
      this.refUni.child(keyUni+'/unidadesGalpao/').on('value', resp => {
        this.galpoes = snapshotToArrayGalpao(resp);
        this.galpoesKey = snapshotToArrayGalpaoKey(resp);
      })
      i++;
    }
    // const loading = this.loadingCtrl.create({
    //   content: 'Excluindo...'
    // });
    var j = 0;
    var m = 0;
    while(j < this.unidades.length){
      var k = 0;
      var uniSeleKey = this.unidadesKey[j];
      var unis = this.unidades[j];
      j++;
      while(k < this.galpoesKey.length){
        var galSeleKey = this.galpoesKey[k];
        var gals = this.galpoes[k];
        const snapshotToArrayUsuarioGalpao = snapshot => {
          snapshot.forEach(element => {
            let usuarioBanco = element.val();
            usuarioBanco.key = element.key;
            if(this.usuarioKey == usuarioBanco.key){ 
              this.unidadeGalpao = unis.nomeUnidade;
              this.galpaoUnidade = gals.nomeGalpao;
              this.mensagem[m]= {unidade: this.unidadeGalpao, galpao: this.galpaoUnidade, uniKey: uniSeleKey, galKey: galSeleKey}; 
              m++;
            } 
          });
        }
        this.refUni.child(uniSeleKey+'/unidadesGalpao/'+galSeleKey+'/usuarios/').on('value', resp => {
          snapshotToArrayUsuarioGalpao(resp);
        })
        k++;
      }
    }
  }

  deletaUsuario(mensagem: any){
    const loading = this.loadingCtrl.create({
      content: 'Excluindo...'
    });
    var m = 0;
    var s = 0;
    while(m < mensagem.length){
      if(mensagem[m].isChecked == true){
        var uniKey = mensagem[m].uniKey;
        var galKey = mensagem[m].galKey;
        this.dbService.excluiGalpaoUsuario(uniKey, galKey, this.usuarioKey);
        this.dbService.excluiIdentificacaoGalpaoUsuario(this.usuarioKey, galKey);
        s++;
      }
      m++;
    }
    if(s == mensagem.length){
      setTimeout( () => { this.dbService.excluiUsuario(this.usuarioKey) }, 10000);
    }  
    loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de Usuário',
                      message: 'Usuário excluído com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de Usuário falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}