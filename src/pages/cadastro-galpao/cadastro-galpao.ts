import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastro-galpao',
  templateUrl: 'cadastro-galpao.html',
})
export class CadastroGalpaoPage {

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
  unidades = [];
  ref = firebase.database().ref('/unidade');
  keyU;
  qtdeGalpoes = null;
  galpoes = [];
  nomeGalpao;
  nomesGalpao = [];
  exemploImg =  'assets/imgs/exemploImg.jpg';

  public qtdeForm: any;
  messageQtde = '';
  erroQtde = false;
  public galpaoUniForm: any;
  public galpaoForm: any;
  messageUnidade = '';
  erroUnidade = false;
  messageNomeGalpao = '';
  erroNomeGalpao = false;
  messageProfundidade = '';
  erroProfundidade = false;
  messageLargura = '';
  erroLargura = false;
  messageAltura = '';
  erroAltura = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    private camera: Camera,
    public fb: FormBuilder
    ) {
      if(navParams.get('unidadeKey') == '')
        this.keyU = null;
      else
        this.keyU = navParams.get('unidadeKey');

      this.qtdeForm = fb.group({
        qtde: ['', Validators.required]
      })
      this.galpaoUniForm = fb.group({
        unidadeG: ['', Validators.required]
      })
      this.galpaoForm = fb.group({
        nomeGalpaoG: ['', Validators.required],
        profundidadeG: ['', [Validators.required, Validators.pattern(/^[0-9]*?(?:[\.,])([0-9]*?)$/g)]],
        alturaG: ['', [Validators.required, Validators.pattern(/^[0-9]*?(?:[\.,])([0-9]*?)$/g)]],
        larguraG: ['', [Validators.required, Validators.pattern(/^[0-9]*?(?:[\.,])([0-9]*?)$/g)]]
      })

    }

  ionViewDidLoad() {
    this.ref.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }

  geraArrayGalpoes(qtdeGalpoes){
    this.nomesGalpao = [];
    this.galpao = {
      nomeGalpao: null,
      largura: null,
      altura: null,
      profundidade: null,
      imagem: null
    }
    this.messageQtde = '';
    this.erroQtde = false;
    var cont= 0;
    this.galpoes = [];
    while(qtdeGalpoes > cont){
      this.galpoes.push(this.galpao);
      cont = cont + 1;
    }
  }


  addGalpao(nomesGalpao: any, galpao: Galpao, novaKey: any){
    let {qtde} = this.qtdeForm.controls;
    if(!this.qtdeForm.valid){
      if(!qtde.valid){
        this.erroQtde = true;
        this.messageQtde = 'QUANTIDADE DE GALPÕES DEVE SER PREENCHIDA';
      }else{
        this.messageQtde = '';
      }
    }else{
        let {unidadeG} = this.galpaoUniForm.controls;
        let {nomeGalpaoG, profundidadeG, alturaG, larguraG} = this.galpaoForm.controls;
        nomeGalpaoG;
        for(var i = 0; i<nomesGalpao.length; i++){
          if(nomesGalpao[i]==undefined || nomesGalpao[i]=='')
            var nomeVazio = true;
        }
        if(nomeVazio){
          this.galpaoForm.status='INVALID'
          this.erroNomeGalpao = true;
          this.messageNomeGalpao = 'NOMES DE TODOS OS GALPÕES DEVEM SER PREENCHIDOS';
        }else{
          this.messageNomeGalpao = '';
        }
        if(!this.galpaoForm.valid || !this.galpaoUniForm.valid){
          if(!unidadeG.valid){
            this.erroUnidade = true;
            this.messageUnidade = 'UNIDADE DEVE SER SELECIONADA';
          }else{
            this.messageUnidade = '';
          }
          // if(!nomeGalpaoG.valid){
          //   this.erroNomeGalpao = true;
          //   this.messageNomeGalpao = 'NOME DO GALPÃO DEVE SER PREENCHIDO';
          // }else{
          //   this.messageNomeGalpao = '';
          // }
          if(!profundidadeG.valid){
            this.erroProfundidade = true;
            this.messageProfundidade = 'PROFUNDIDADE DEVE SER PREENCHIDA NO FORMATO 99,99';
          }else{
            this.messageProfundidade = '';
          }
          if(!alturaG.valid){
            this.erroAltura = true;
            this.messageAltura = 'ALTURA DEVE SER PREENCHIDA NO FORMATO 99,99';
          }else{
            this.messageAltura = '';
          }
          if(!larguraG.valid){
            this.erroLargura = true;
            this.messageLargura = 'LARGURA DEVE SER PREENCHIDA NO FORMATO 99,99';
          }else{
            this.messageLargura = '';
          }
        }else{
          this.dbService.cadastraGalpaoInicial(galpao, nomesGalpao, novaKey);
          this.exibeAlerta();
        }
      
    }
  }

  addGalpaoUni(nomesGalpao:any, galpao: Galpao){
    let {qtde} = this.qtdeForm.controls;
    if(!this.qtdeForm.valid){
      if(!qtde.valid){
        this.erroQtde = true;
        this.messageQtde = 'QUANTIDADE DE GALPÕES DEVE SER PREENCHIDA';
      }else{
        this.messageQtde = '';
      }
    }else{
      let {nomeGalpaoG, profundidadeG, alturaG, larguraG, imagemG} = this.galpaoForm.controls;
      imagemG;
      if(!this.galpaoForm.valid){
        if(!nomeGalpaoG.valid){
          this.erroNomeGalpao = true;
          this.messageNomeGalpao = 'NOME DO GALPÃO DEVE SER PREENCHIDO';
        }else{
          this.messageNomeGalpao = '';
        }
        if(!profundidadeG.valid){
          this.erroProfundidade = true;
          this.messageProfundidade = 'PROFUNDIDADE DEVE SER PREENCHIDA';
        }else{
          this.messageProfundidade = '';
        }
        if(!alturaG.valid){
          this.erroAltura = true;
          this.messageAltura = 'ALTURA DEVE SER PREENCHIDA';
        }else{
          this.messageAltura = '';
        }
        if(!larguraG.valid){
          this.erroLargura = true;
          this.messageLargura = 'LARGURA DEVE SER PREENCHIDA';
        }else{
          this.messageLargura = '';
        }
      }else{
        this.dbService.cadastraGalpaoInicial(galpao, nomesGalpao, this.keyU);
        this.exibeAlerta();
      }
    }
  }

  exibeAlerta(){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present().then((data) => { loading.dismiss(); const alert = this.alertCtrl.create({
      subTitle: 'Galpão cadastrado com sucesso!',
      message: 'Deseja cadastrar outro galpão?',
      buttons: [{
        text: 'Não',
        handler: () => {this.navCtrl.setRoot('HomeAdmPage')}
      },
      {
        text: 'Sim',
        handler: () => {this.navCtrl.setRoot(this.navCtrl.getActive().component), this.qtdeGalpoes = ''}
      }]});
    alert.present()
  })
  .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
      subTitle: 'Cadastro de galpão falhou',
      message: error.message,
      buttons: ['Ok']});
    alert.present();})
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 750,
      targetHeight: 625 
    }

    this.camera.getPicture(options).then((imageData) => {
      this.galpao.imagem = 'data:image/jpeg;base64,' + imageData; 
      this.exemploImg = this.galpao.imagem;
    }, (err) => {
      //erro aqui
    });
  }


  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}