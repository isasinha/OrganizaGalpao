import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider { 

  ref = firebase.database().ref('/unidade');
  refUser = firebase.database().ref('/usuario');


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

  cadastraUsuario(usuario:Usuario, usuarioGalpao?:string, keyGalpao?: any){
     let keyUsuario = this.db.list('usuario').push(usuario).key;
     if(usuarioGalpao != null){
      this.refUser.child('/'+keyUsuario+'/Galpao/'+keyGalpao).update(usuarioGalpao);
    }
    return keyUsuario;
  }

  excluiGalpao(keyUnidade: any, keyGalpao: any){
    this.db.object('/unidade/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).remove();
  }

  excluiUnidade(keyUnidade: any){
    this.db.object('/unidade/'+keyUnidade).remove();
  }

  excluiAdmin(keyUsuario: any){
    this.db.object('/usuario/'+keyUsuario).remove();
  }

  excluiUsuario(keyUsuario: any){
    this.db.object('/usuario/'+keyUsuario).remove();
  }

  excluiGalpaoUsuario(keyUnidade: any, keyGalpao: any, keyUsuario: any){
    this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/'+keyUsuario).remove();
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

  editaGalpaoUsuario(keyUnidade: any, keyGalpao: any, keyUsuario: any, usuario: Usuario){

    if(usuario.cpf != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/'+keyUsuario).update({
        cpf: usuario.cpf
      })
    }
    if(usuario.nome != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/'+keyUsuario).update({
        nome: usuario.nome
      })
    }
    if(usuario.sobrenome != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/'+keyUsuario).update({
        sobrenome: usuario.sobrenome
      })
    }
    if(usuario.email != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/'+keyUsuario).update({
        email: usuario.email
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

  editaUsuario(keyUsuario: any, usuario: any, usuarioGalpao?: string, keyGalpao?:any){

    if(usuario.nome != null){
      this.refUser.child('/'+keyUsuario).update({
        nome: usuario.nome
      })
    }
    if(usuario.sobrenome != null){
      this.refUser.child('/'+keyUsuario).update({
        sobrenome: usuario.sobrenome
      })
    }
    if(usuario.email != null){
      this.refUser.child('/'+keyUsuario).update({
        email: usuario.email
      })
    }
    if(usuario.cpf != null){
      this.refUser.child('/'+keyUsuario).update({
        cpf: usuario.cpf
      })
    }
    if(usuario.senha != null){
      this.refUser.child('/'+keyUsuario).update({
        senha: usuario.senha
      })
    }
    if(usuarioGalpao != null){
      this.refUser.child('/'+keyUsuario+'/Galpao/'+keyGalpao).set(usuarioGalpao);
    }
  }

  excluiIdentificacaoGalpaoUsuario(keyUsuario: any, identiKey: any){
    this.refUser.child('/'+keyUsuario+'/Galpao/'+identiKey).remove();
  }

}