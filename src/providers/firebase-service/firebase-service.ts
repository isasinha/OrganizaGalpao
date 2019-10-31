import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao, Unidade } from '../../app/Modelo/galpao';
import { Usuario } from '../../app/Modelo/usuario';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider { 

  ref = firebase.database().ref('/unidade');
  refUser = firebase.database().ref('/usuario');
  refArm = firebase.database().ref('/armazenamento');
  profundidade;
  altura;
  largura;


  constructor(
    public db: AngularFireDatabase) {

  }

  cadastraUnidade(unidade: Unidade){
    let unidadeKey = this.db.list('unidade').push(unidade).key;
    return unidadeKey;
  }

  geraPosicao(galpao:Galpao){
    this.profundidade = galpao.profundidade;
    this.altura = galpao.altura;
    this.largura = galpao.largura;
    
    var profString = galpao.profundidade.toString();
    var profArray = profString.split('');
    var x = 0;
    while (x < profArray.length){
      if (profArray[x] == '.' || profArray[x] == ',' )
        var profEhDecimal = true;
      x++;
    }
    if (profEhDecimal){
      var decimalProfundidade = parseInt(/^[0-9]*?(?:[\.,])([0-9]*?)$/g.exec(galpao.profundidade.toString())[1]);
      this.profundidade = Math.trunc(parseInt(galpao.profundidade.toString()));
      if (decimalProfundidade > 5){
        this.profundidade = this.profundidade + 1;
      }
    }

    var altString = galpao.altura.toString();
    var altArray = altString.split('')
    var w = 0;
    while (w < altArray.length){
      if (altArray[w] == '.' || altArray[w] == ',')
        var altEhDecimal = true;
      w++;
    }
    if (altEhDecimal){
      var decimalAltura = parseInt(/^[0-9]*?(?:[\.,])([0-9]*?)$/g.exec(galpao.altura.toString())[1]);
      this.altura = Math.trunc(parseInt(galpao.altura.toString()))
      if (decimalAltura > 5){
        this.altura = this.altura + 1;
      }
    }

    var largString = galpao.largura.toString();
    var largArray = largString.split('')
    var z = 0;
    while (z < largArray.length){
      if (largArray[z] == '.' || largArray[z] == ',')
        var largEhDecimal = true;
      z++;
    }
    if (largEhDecimal){
      var decimalLargura = parseInt(/^[0-9]*?(?:[\.,])([0-9]*?)$/g.exec(galpao.largura.toString())[1]);
      this.largura = Math.trunc(parseInt(galpao.largura.toString()));
      if (decimalLargura > 5){
        this.largura = this.largura + 1;
      }
    }

    var medidas = [];
    medidas.push(this.profundidade);
    medidas.push(this.altura);
    medidas.push(this.largura);

    return medidas;

  }

  cadastraGalpaoInicial(galpao:Galpao, nomesGalpao: any, keyU: any){
    this.geraPosicao(galpao);

    let i = 0;
    while(i < nomesGalpao.length){
      galpao.nomeGalpao = nomesGalpao[i];
      var keyGalpao = this.ref.child('/'+keyU+'/unidadesGalpao').push(galpao).key; 
      if(galpao.imagem != null){
        this.refArm.child('/'+keyGalpao+'/').set({imagem: galpao.imagem});
      }
      var posicao = '';
      for (var j = 0; j < this.profundidade; j++){
        posicao = (j+1).toString();
        var posicaoProfundidade = 'P' + posicao + '-';
        for (var k = 0; k < this.altura; k++){
          posicao = posicaoProfundidade + 'A' + (k+1).toString() + '-';
          var posicaoAltura = posicao;
          for (var l = 0; l < this.largura; l++){
            posicao = posicaoAltura + 'L' + (l+1).toString();
            this.refArm.child('/'+keyGalpao+'/posicao/'+ posicao).set({observacao: ""});
            // this.refArm.child('/'+keyGalpao+'/posicao').push(posicao);
            posicao = '';
          }
        }
      }
      i = i + 1;
    }
  }


  cadastraGalpaoLiberar(galpao:Galpao, keyGalpao: any){
    this.geraPosicao(galpao);

    let i = 0;
      if(galpao.imagem != null){
        this.refArm.child('/'+keyGalpao+'/').set({imagem: galpao.imagem});
      }
      var posicao = '';
      for (var j = 0; j < this.profundidade; j++){
        posicao = (j+1).toString();
        var posicaoProfundidade = 'P' + posicao + '-';
        for (var k = 0; k < this.altura; k++){
          posicao = posicaoProfundidade + 'A' + (k+1).toString() + '-';
          var posicaoAltura = posicao;
          for (var l = 0; l < this.largura; l++){
            posicao = posicaoAltura + 'L' + (l+1).toString();
            this.refArm.child('/'+keyGalpao+'/posicao/'+ posicao).set({observacao: ""});
            // this.refArm.child('/'+keyGalpao+'/posicao').push(posicao);
            posicao = '';
          }
        }
      }
      i = i + 1;
  }

  cadastraObservacao(keyGalpao: any, posicao: any, observacao: string){
     this.refArm.child('/'+keyGalpao+'/posicao/'+posicao).update({observacao: observacao});
  }

  
  cadastraPasta(keyGalpao: any, posicao: any, pasta: string, item: string){
    this.refArm.child('/'+keyGalpao+'/posicao/'+posicao+'/'+pasta+'/itens').push({item: item});
  }

  cadastraItem(keyGalpao: any, posicao: any, pasta: string, item: string){
    this.refArm.child('/'+keyGalpao+'/posicao/'+posicao+'/'+pasta+'/itens').push({item: item});
  }

  excluiItem(keyGalpao: any, posicao: any, pasta: string, itemKey: string){
    this.refArm.child('/'+keyGalpao+'/posicao/'+posicao+'/'+pasta+'/itens/'+itemKey).remove();
  }

  excluiPasta(keyGalpao: any, posicao: any, pasta: string){
    this.refArm.child('/'+keyGalpao+'/posicao/'+posicao+'/'+pasta).remove();
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
    this.db.object('/armazenamento/'+keyGalpao).remove();
  }

  excluiUnidade(keyUnidade: any){
    this.ref.child('/'+keyUnidade+'/unidadesGalpao/').on('value', snapshot => {
      var keyGalpao = '';
      var usuarios = [];
      snapshot.forEach(element => {
        let galpao = element.val();
        galpao.key = element.key;
        keyGalpao = element.key;
        firebase.database().ref('/unidade/'+keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/').on('value', snapshot => { 
          snapshot.forEach(element => {
            let usuario = element.val();
            usuario.key = element.key;
            usuarios.push(usuario.key); 
          });
        })
        for (var i = 0; i<usuarios.length; i++){
          var keyUsuario = usuarios[i];
          this.excluiIdentificacaoGalpaoUsuario(keyUsuario, keyGalpao);
        }
        this.excluiGalpao(keyUnidade, keyGalpao);
      })
    });
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

  excluiIdentificacaoGalpaoUsuario(keyUsuario: any, identiKey: any){
    this.refUser.child('/'+keyUsuario+'/Galpao/'+identiKey).remove();
    const snapshotToArrayUsuarioKey = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key;
        returnArray.push(galpao.key); 
      });
      return returnArray;
    }
    this.refUser.child('/'+keyUsuario+'/Galpao/').on('value', resp => { 
      let galpoes = [];
      galpoes = snapshotToArrayUsuarioKey(resp);
      if (galpoes.length == 0){
        this.excluiUsuario(keyUsuario);
      }
    })
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
    if(galpao.imagem != null){
      this.ref.child('/'+keyUnidade+'/unidadesGalpao/'+keyGalpao).update({
        imagem: galpao.imagem
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


  //*****************************Descomentar para alterar a função já existente ***********************************/
  //
  //||editaUsuario(keyUsuario: any, usuario: any, usuarioGalpao?: string, keyGalpao?:any): Observable <any>{
//||
  //||  if(usuarioGalpao != null){
  //||    this.insereUsuarioGalpao(usuarioGalpao, keyUsuario, keyGalpao).subscribe();
  //||  }
  //||
  //||  // (this.refUser.child("/" + keyUsuario).on('value', resp => {
  //||  //   (resp);
  //||  // })as Observable<any>
  //||  return Observable.of(this.refUser.child("/" + keyUsuario).on('value', resp => {
  //||    (snapshot) => { 
  //||    snapshot.forEach (element => {
  //||      let usuarioExistente = element.val();
  //||      usuarioExistente.key = element.key;
  //||      this.refUser.child ('/' + keyUsuario).update ({
  //||      nome : usuario.nome != null ? usuario.nome : usuarioExistente.nome,
  //||      sobrenome : usuario.sobrenome != null ? usuario.sobrenome :usuarioExistente.sobrenome,
  //||      cpf: usuario.cpf != null ? usuario.cpf : usuarioExistente.cpf,
  //||      email: usuario.email != null ? usuario.email : usuarioExistente.email,
  //||      senha : usuario.senha != null ? usuario.senha : usuarioExistente.senha
  //||      });
  //||    });
  //||    }
  //||  }))as Observable<any>
  //||}
  //||
  //||insereUsuarioGalpao(usuarioGalpao: any, keyUsuario: any, keyGalpao: any): Observable<any>{
  //||  return Observable.of(this.refUser.child('/'+keyUsuario+'/Galpao/'+keyGalpao).set(usuarioGalpao)) as Observable<any>;
  //||}

}