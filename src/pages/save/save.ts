import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-save',
  templateUrl: 'save.html',
})
export class SavePage {

  usuario = {
    'cpf': '',
    'senha': '',
    'tipo': '',
    'email': ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavePage');
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  } 

  save(usuario){
    this.dbService.save(usuario);
  }

}
