import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { Usuario } from '../../app/Modelo/usuario';

@Injectable()
export class FirebaseServiceProvider { 

  constructor(public db: AngularFireDatabase) {

  }

  cadastraUsuario(usuario:Usuario){
    this.db.list('usuario').push(usuario);
  }

  cadastraGalpao(galpao:Galpao, unidade: Unidade){
    return this.db.list('unidade').push(unidade.galpao);    
  }

  cadastraUnidade(unidade: Unidade){
    return this.db.list('unidade').push(unidade);    
  }

  listaUnidades(){
    return this.db.list('unidade').snapshotChanges().map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    })
  }

}
