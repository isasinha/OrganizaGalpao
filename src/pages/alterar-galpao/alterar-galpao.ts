import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-alterar-galpao',
  templateUrl: 'alterar-galpao.html',
})
export class AlterarGalpaoPage {


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
  imagem;
  temUsuario = false;
  ref = firebase.database().ref('/unidade/');
  exemploImg =  'assets/imgs/exemploImg.jpg';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    private camera: Camera
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
      let returnArray = [];
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key;
        if(galpao.key == keyGalpao){
          returnArray.push(galpao); 
        }
      });
      return returnArray;
    }
    this.ref.child(this.keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpaoSelecionado = snapshotToArrayGalpaoSelecionado(resp);
    })
  }

  alteraGalpao(keyUnidade: any, keyGalpao: any, galpao: Galpao,){
    const loading = this.loadingCtrl.create({
      content: 'Alterando...'
    });
    if(this.imagem){
      galpao.imagem = this.imagem;
    }
    this.temUsuario = this.dbService.editaGalpao(keyUnidade, keyGalpao, galpao, this.galpaoSelecionado);
    if(this.temUsuario){
      const alert = this.alertCtrl.create({
        subTitle: 'Alteração de Galpão',
        message: 'As medidas não podem ser alteradas, pois existe usuário administrando o galpão!',
        buttons: ['Ok']});
      alert.present()
    }else{
      loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Alteração de Galpão',
                        message: 'Galpão alterado com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                    .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                        subTitle: 'Alteração de galpão falhou',
                        message: error.message,
                        buttons: ['Ok']}); 
                      alert.present();});
    }
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 700,
      targetHeight: 700
    }

    this.camera.getPicture(options).then((imageData) => {
      this.galpao.imagem = 'data:image/jpeg;base64,' + imageData; 
      this.imagem = this.galpao.imagem;
    }, (err) => {
      //erro aqui
    });
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}