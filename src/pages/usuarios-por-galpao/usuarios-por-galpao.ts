import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-usuarios-por-galpao',
  templateUrl: 'usuarios-por-galpao.html',
})
export class UsuariosPorGalpaoPage {


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
  galpaoSelecionado = [];
  keyGalpao;
  keyUnidade;
  keyUsuario;
  usuarios = [];
  usuariosKey = [];
  ref = firebase.database().ref('/unidade/');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
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

  buscaUsuariosGalpao(keyGalpao: any){
    const snapshotToArrayUsuariosGalpao = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuario = element.val();
        usuario.key = element.key;
        returnArray.push(usuario.key); 
      });
      return returnArray;
    }
    this.usuariosKey = [];
    this.ref.child(this.keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/').on('value', resp => {
      this.usuariosKey = snapshotToArrayUsuariosGalpao(resp);
    })
    this.exibirUsuariosGalpaoSelecionado(keyGalpao)
  }

  exibirUsuariosGalpaoSelecionado(keyGalpao: any){
    const snapshotToArrayUsuariosGalpao = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuario = element.val();
        usuario.key = element.key;
        returnArray.push(usuario); 
      });
      return returnArray;
    }
    var i = 0;
    while(i < this.usuariosKey.length){
      this.keyUsuario = this.usuariosKey[i];
      this.ref.child(this.keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/'+this.keyUsuario).on('value', resp => {
        this.usuarios.push(snapshotToArrayUsuariosGalpao(resp));
      })
      i++
    }
  }


  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}