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

  cadastraUnidade(unidade: Unidade){
    this.db.list('unidade').push(unidade);
  }

  cadastraGalpao(keyU: any, galpao:Galpao){
    this.ref.child('/'+keyU+'/unidadesGalpao').push(galpao); 
  }

  cadastraUsuario(usuario:Usuario){
    this.db.list('usuario').push(usuario);
  }

  excluiGalpao(keyUnidade: any, keyGalpao: any){
    this.db.object('/unidade/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).remove();
  }

  excluiUnidade(keyUnidade: any){
    this.db.object('/unidade/'+keyUnidade).remove();
  }
}



  // insereGalpaoUnidade(keyU: any, galpao: Galpao){
  //   this.db.list('/unidade/'+keyU+'/unidadesGalpao/').update(galpao.nomeGalpao,{
  //     unidade: galpao.unidade,
  //     nomeGalpao: galpao.nomeGalpao,
  //     largura: galpao.largura,
  //     altura: galpao.altura,
  //     profundidade: galpao.profundidade,
  //     imagem: galpao.imagem
  //   })
  // }