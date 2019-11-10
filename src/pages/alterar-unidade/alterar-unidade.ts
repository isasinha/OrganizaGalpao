import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-alterar-unidade',
  templateUrl: 'alterar-unidade.html',
})
export class AlterarUnidadePage {


  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null,
    endereco: null,
    telefone: null
  };

  unidades:Array<Unidade> = [];
  unidadeSelecionada =[];
  keyUnidade;
  jaExiste = false;
  ref = firebase.database().ref('/unidade/'); 
  public unidadeForm: any;
  messageUnidade = '';
  erroUnidade = false;
  messageUnidadeJa = '';
  erroUnidadeJa = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.unidadeForm = this.fb.group({
        nomeUnidade: null,
        endereco: null,
        telefone: null
      })
  }

  ionViewDidLoad() {
    this.ref.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }


  exibirUnidadeSelecionada(keyUnidade: any){
    const snapshotToArrayGalpaoSelecionado = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let unidade = element.val();
         unidade.key = element.key;
        if(unidade.key == keyUnidade){
          returnArray.push(unidade); 
        }
      });
      return returnArray;
    }
    this.ref.on('value', resp => {
      this.unidadeSelecionada = snapshotToArrayGalpaoSelecionado(resp);
    })
  }

  alteraUnidade(keyUnidade: any, unidade: Unidade,){
    const loading = this.loadingCtrl.create({
      content: 'Alterando...'
    });
    let {nomeUnidade, endereco, telefone} = this.unidadeForm.controls;
    this.selecionaUnidade(nomeUnidade.value);
    if(!nomeUnidade.value && !endereco.value && !telefone.value){
      this.unidadeForm.status = 'INVALID';
      if(!this.unidadeForm.valid){
        this.erroUnidade = true;
        this.messageUnidade = 'AO MENOS 1 ITEM DEVE SER ALTERADO';
      }else{
        this.messageUnidade = '';
      }
    }else if(this.jaExiste){
      this.unidadeForm.status = 'INVALID';
      if(!this.unidadeForm.valid){
        this.erroUnidadeJa = true;
        this.messageUnidadeJa = 'JÁ EXISTE UMA UNIDADE CADASTRADA COM ESSE NOME';
      }else{
        this.messageUnidadeJa = '';
      }
    }else{
      this.dbService.editaUnidade(keyUnidade, unidade);
      if(unidade.nomeUnidade){
        var nomeUni = unidade.nomeUnidade;
        var soIdent = true;
        this.ref.child(keyUnidade+'/unidadesGalpao/').on('value', snapshot => {
          var usuarioGalpao;
          snapshot.forEach(element => {
            let galpao = element.val();
            var galpaoKey = galpao.key = element.key;
            var nomeGal = galpao.nomeGalpao;
            this.ref.child(keyUnidade+'/unidadesGalpao/'+galpaoKey+'/usuarios').on('value', outroSnapshot => {
              outroSnapshot.forEach(element => {
                let usuario = element.val();
                var usuarioKey = usuario.key = element.key;
                usuarioGalpao = {Unidade: nomeUni, Galpao: nomeGal}

                this.dbService.editaUsuario(usuarioKey, usuario, usuarioGalpao, galpaoKey, soIdent)
              });
            })

          });
        
        })
      }

      loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Alteração de Unidade',
                        message: 'Unidade alterada com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                    .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Alteração de unidade falhou',
                        message: error.message,
                        buttons: ['Ok']});
                      alert.present();});
    }
  }

  selecionaUnidade(unidadeNome: any){
    this.jaExiste = false;
    this.ref.on('value', snapshot => {
      snapshot.forEach(element => {
        let unidadeBanco = element.val();
        unidadeBanco.key = element.key;
        if(unidadeNome == unidadeBanco.nomeUnidade){
          this.jaExiste = true;
        }
      });
    })
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}