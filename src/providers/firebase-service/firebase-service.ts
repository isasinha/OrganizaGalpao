import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider { 

  ref = firebase.database().ref('/unidade');

  constructor(public db: AngularFireDatabase) {

  }

  cadastraUsuario(usuario:Usuario){
    this.db.list('usuario').push(usuario);
  }

  cadastraGalpao(galpao:Galpao){
    this.db.list('galpao').push(galpao);    
  }

  cadastraUnidade(unidade: Unidade){
    this.db.list('unidade').push(unidade);    
  }

  listaUnidades(){
    this.db.list('unidade')
  }
  
  alteraUnidadeOLD(galpao: Galpao, unidadeKey: any){
    firebase.database().ref('unidade/'+ unidadeKey).update({galpao:galpao})
  }

  alteraUnidade(nomeUnidade: string, galpao: Galpao){
    this.db.list('/unidade').snapshotChanges().subscribe((res) => {
      res.forEach((element:any) => {
        if (element.payload.val().unidade == nomeUnidade){
          this.db.list('/unidade').update(element.key, {galpao:galpao})
        }
      })
    })
  }

}
