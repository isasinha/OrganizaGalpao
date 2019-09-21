import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider { 

  ref = firebase.database().ref('/unidade');


  constructor(
    public db: AngularFireDatabase) {

  }

  cadastraUnidade(unidade: Unidade){
    let unidadeKey = this.db.list('unidade').push(unidade).key;
    return unidadeKey;
  }

  cadastraGalpao(keyU: any, galpao:Galpao, nomesGalpao: any){
    let i = 0;
    while(i < nomesGalpao.length){
      galpao.nomeGalpao = nomesGalpao[i];
      this.ref.child('/'+keyU+'/unidadesGalpao').push(galpao); 
      i = i + 1;
    }
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

  listaUnidade(){
    return this.db.list('unidade/');
  }

  editaGalpao(keyUnidade: any, keyGalpao: any, galpao: Galpao){

    if(galpao.nomeGalpao != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).update({
        nomeGalpao: galpao.nomeGalpao
      })
    }
    if(galpao.largura != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).update({
        largura: galpao.largura
      })
    }
    if(galpao.altura != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).update({
        altura: galpao.altura
      })
    }
    if(galpao.profundidade != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).update({
        profundidade: galpao.profundidade
      })
    }
  }

  editaUnidade(keyUnidade: any, unidade: Unidade){

    if(unidade.nomeUnidade != null){
      this.ref.child('/'+keyUnidade).update({
        nomeUnidade: unidade.nomeUnidade
      })
    }
    if(unidade.endereco != null){
      this.ref.child('/'+keyUnidade).update({
        endereco: unidade.endereco
      })
    }
    if(unidade.telefone != null){
      this.ref.child('/'+keyUnidade).update({
        telefone: unidade.telefone
      })
    }
  }

}