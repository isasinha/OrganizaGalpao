import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import { AuthService } from '../../app/auth.service';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { CadastroMedicoPage } from '../cadastro-medico/cadastro-medico';
import { CadastroRecepPage } from '../cadastro-recep/cadastro-recep';

@IonicPage()
@Component({
  selector: 'page-adm-medico',
  templateUrl: 'home-adm.html',
})
export class HomeAdmPage {

  opcaoSelecionada: any;
  opcoes: Array<{item: string, endereco: any}>
  nomeUsuario;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
      this.nomeUsuario = navParams.get('nome');
      this.opcaoSelecionada = navParams.get('opcao');
      this.opcoes = [
        {item: 'Médico', endereco: CadastroMedicoPage},
        {item: 'Recepcionista', endereco: CadastroRecepPage}
    ];

  }

  opcaoEscolhida(event, opcao){
    this.navCtrl.setRoot(opcao.endereco); 
  }

  


}
