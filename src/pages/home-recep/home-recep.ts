import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import { AuthService } from '../../app/auth.service';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { CadastroRecepPage } from '../cadastro-recep/cadastro-recep';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';

@IonicPage()
@Component({
  selector: 'page-home-recep',
  templateUrl: 'home-recep.html',
})
export class HomeRecepPage {

  nomeUsuario;
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    ) {
      this.nomeUsuario = navParams.get('nome');
  }

  ionViewDidLoad() {

  }

  novoPaciente(){
    this.navCtrl.push(CadastroUsuarioPage)
  }


}
