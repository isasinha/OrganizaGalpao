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
  
  insereGalpaoUnidade(key: any, galpao: Galpao){
    this.db.list('/unidade/'+key+'/unidadesGalpao/').update(galpao.nomeGalpao,{
      unidade: galpao.unidade,
      nomeGalpao: galpao.nomeGalpao,
      largura: galpao.largura,
      altura: galpao.altura,
      profundidade: galpao.profundidade,
      imagem: galpao.imagem
    })
  }

  excluiGalpao(keyGalpao: any){
    this.db.list('/galpao/'+keyGalpao).remove();
  }

  excluiGalpaoUnidade(keyUnidade: any, nomeGalpao: string){
    this.db.object('/unidade/'+keyUnidade+'/unidadesGalpao/'+nomeGalpao).remove();
  }

}
