import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { HomeAdmPage } from '../home-adm/home-adm';


@IonicPage()
@Component({
  selector: 'page-administradores',
  templateUrl: 'administradores.html',
})
export class AdministradoresPage {

  usuarios:Array<Usuario> = [];
  ref = firebase.database().ref('/usuario/');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider
    ) {
  }

  ionViewDidLoad() {
    const snapshotToArrayUsuario = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let usuario = element.val();
         usuario.key = element.key;
        if(usuario.tipo == 'Administrador'){
          returnArray.push(usuario); 
        }
      });
      return returnArray;
    }
    this.ref.on('value', resp => { 
      this.usuarios = snapshotToArrayUsuario(resp);
    })
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
