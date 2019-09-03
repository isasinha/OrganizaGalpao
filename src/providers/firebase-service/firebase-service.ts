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
    this.db.list('unidade.galpao').push(galpao);    
  }

  cadastraUnidade(unidade: Unidade){
    this.db.list('unidade').push(unidade);    
  }

  listaUnidades(){
    this.db.list('unidade')
  }
  
}
