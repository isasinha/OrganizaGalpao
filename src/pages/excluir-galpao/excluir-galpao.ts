import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-excluir-galpao',
  templateUrl: 'excluir-galpao.html',
})
export class ExcluirGalpaoPage {

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
  keyGalpao;
  keyUnidade;
  usuarios = []; 
  ref = firebase.database().ref('/unidade/');
  public galpaoForm: any;
  messageUnidade = '';
  erroUnidade = false;
  messageGalpao = '';
  erroGalpao = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.ref.on('value', resp => { 
        this.unidades = snapshotToArrayUnidade(resp);
      })
      this.galpaoForm = fb.group({
        uni: ['', Validators.required],
        galp: ['', Validators.required]
      })
  }

  ionViewDidLoad() {

  }

  selecionaGalpao(key: any){
    this.ref.child(key+'/unidadesGalpao/').on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
    })
  }

  deletaGalpao(keyUnidade: any, keyGalpao: any){
    const loading = this.loadingCtrl.create({
      content: 'Excluindo...'
    });
    let {uni, galp} = this.galpaoForm.controls;
    if(!this.galpaoForm.valid){
      if(!uni.valid){
        this.erroUnidade = true;
        this.messageUnidade = 'UNIDADE DEVE SER SELECIONADA';
      }else{
        this.messageUnidade = '';
      }
      if(!galp.valid){
        this.erroGalpao = true;
        this.messageGalpao = 'GALPÃO DEVE SER SELECIONADO';
      }else{
        this.messageGalpao = '';
      }
    }else{
    const snapshotToArrayUsuarioKey = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
        let usuario = element.val();
        usuario.key = element.key;
        returnArray.push(usuario.key); 
      });
      return returnArray;
    }
    firebase.database().ref('/unidade/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/').on('value', resp => { 
      this.usuarios = snapshotToArrayUsuarioKey(resp);
    })
    for (var i = 0; i<this.usuarios.length; i++){
      var keyUsuario = this.usuarios[i];
      this.dbService.excluiIdentificacaoGalpaoUsuario(keyUsuario, keyGalpao);
    }
    setTimeout( () => { this.dbService.excluiGalpao(keyUnidade, keyGalpao) }, 10000);
    loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de Galpão',
                      message: 'Galpão excluído com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de galpão falhou',
                      message: error.message,
                      buttons: ['Ok']});
                    alert.present();});
    }
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
