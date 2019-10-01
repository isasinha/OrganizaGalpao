import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import { AuthService } from '../../app/auth.service';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
import { Unidade, Galpao, snapshotToArrayUnidade, snapshotToArrayGalpao, snapshotToArrayUnidadeNome } from '../../app/Modelo/galpao';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  usuario: Usuario = {
    nome: '', 
    sobrenome: '',
    cpf: '',
    senha: '12345678',
    tipo: 'Usuario',
    email: ''
  }
  
  unidade: Unidade={
    nomeUnidade: null,
    unidadesGalpao: null,
    endereco: null,
    telefone: null
  };
  galpao: Galpao = {
    nomeGalpao: null,
    largura: null,
    altura: null,
    profundidade: null,
    imagem: null
  };
  unidades:Array<Unidade> = [];
  galpoes = [];
  galpaoSelecionado = [];
  usuariosNoGalpao = [];
  keyGalpao;
  keyUnidade;
  keyUsuario;
  nomeUnidade = [];
  nomeGalpao = [];
  usuarioSelecionado = [];
  usuarioSelecionadoGalpao = [];
  usuarioGalpao;
  show = false;
  showUG = false;
  temUsuario = false;
  temUsuarioUG = false;
  galpoesUser = [];
  user = [];
  usuarioKey;
  usuarioCpf; 
  ref = firebase.database().ref('/unidade/');
  refUser = firebase.database().ref('/usuario/');

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    // private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {
  }

  ionViewDidLoad() {
    this.ref.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp);
    })
  }

  selecionaUsuario(usuarioCpf: any){
    this.user = [];
    const snapshotToArrayUsuarioCPF = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Usuario'){
          if(usuarioCpf == usuarioBanco.cpf){
            this.user = usuarioBanco;
            this.usuarioKey = usuarioBanco.key;
            this.temUsuario = true;
          }
        }
      });
      return this.user;
    }
    this.refUser.on('value', resp => {
      this.usuarioSelecionado = [];
      this.temUsuario = false;
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
    this.selecionaUsuarioGalpao(usuarioCpf);
  }

  selecionaUsuarioGalpao(usuarioCpf: any){
    this.galpoesUser = [];
    const snapshotToArrayUsuarioCPFGalpao = snapshot => {
      snapshot.forEach(element => {
        let usuarioBanco = element.val();
        this.galpoesUser.push(usuarioBanco)
      });
      return this.galpoesUser;
    }
    this.refUser.child(this.usuarioKey+'/Galpao/').on('value', resp => {
      this.usuarioSelecionadoGalpao = [];
      this.usuarioSelecionadoGalpao = snapshotToArrayUsuarioCPFGalpao(resp);
    })
  }

  selecionaGalpao(keyUnidade: any){
    this.keyUnidade = keyUnidade;
    this.ref.child(keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpoes = snapshotToArrayGalpao(resp);
    })
  }

  exibirGalpaoSelecionado(keyGalpao: any){
    const snapshotToArrayGalpaoSelecionado = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key;
        if(galpao.key == keyGalpao){
          returnArray.push(galpao); 
        }
      });
      return returnArray;
    }
    this.ref.child(this.keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.galpaoSelecionado = snapshotToArrayGalpaoSelecionado(resp);
    })
    this.jaExisteUsuario(keyGalpao);
  }

  addUsuario(keyUnidade: any, keyGalpao: any, usuario: Usuario){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.ref.on('value', resp => {
      this.nomeUnidade = snapshotToArrayUnidadeNome(resp);
    })
    const snapshotToArrayGalpaoNome = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key;
        if(galpao.key == keyGalpao){
          returnArray.push(galpao.nomeGalpao); 
        }
      });
      return returnArray;
    }
    this.ref.child(this.keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.nomeGalpao = snapshotToArrayGalpaoNome(resp);
    })
    this.usuarioGalpao = {Unidade: this.nomeUnidade[0], Galpao: this.nomeGalpao[0]}
    this.keyUsuario = this.dbService.cadastraUsuario(this.usuario, this.usuarioGalpao, keyGalpao);
    this.addUsuarioGalpao(this.keyUnidade, keyGalpao, this.keyUsuario, this.usuario);
    loading.present().then((data) => {loading.dismiss(); 
      const alert = this.alertCtrl.create({
          subTitle: 'Cadastro de usuário', 
          message: 'Usuário cadastrado com sucesso!',
          buttons: ['Ok']});
        alert.present().then(r => this.navCtrl.setRoot(HomeAdmPage))})
      .catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          subTitle: 'Cadastro de usuário falhou',
          message: 'Verifique os dados de login e senha e tente novamente',
          buttons: ['Ok']});
        alert.present();})
  }

  alteraUsuario(keyUnidade: any, keyGalpao: any){
    this.ref.on('value', resp => {
      this.nomeUnidade = snapshotToArrayUnidadeNome(resp);
    })
    const snapshotToArrayGalpaoNome = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let galpao = element.val();
         galpao.key = element.key; 
        if(galpao.key == keyGalpao){
          returnArray.push(galpao.nomeGalpao); 
        }
      });
      return returnArray;
    }
    this.ref.child(keyUnidade+'/unidadesGalpao/').on('value', resp => {
      this.nomeGalpao = snapshotToArrayGalpaoNome(resp);
    })
    this.usuarioGalpao = {Unidade: this.nomeUnidade[0], Galpao: this.nomeGalpao[0]}
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    this.dbService.editaUsuario(this.usuarioKey, this.usuarioSelecionado, this.usuarioGalpao, keyGalpao);
    loading.present().then((data) => {loading.dismiss(); 
                    const alert = this.alertCtrl.create({
                        subTitle: 'Cadastro de usuário', 
                        message: 'Usuário cadastrado com sucesso!',
                        buttons: ['Ok']});
                      alert.present().then(r => this.navCtrl.setRoot(HomeAdmPage))})
                    .catch((error) => {
                      loading.dismiss();
                      const alert = this.alertCtrl.create({
                        subTitle: 'Cadastro de usuário falhou',
                        message: 'Verifique os dados de login e senha e tente novamente',
                        buttons: ['Ok']});
                      alert.present();})
    this.addUsuarioGalpao(this.keyUnidade, keyGalpao, this.usuarioKey, this.usuarioSelecionado);
  }

  addUsuarioGalpao(keyUnidade: any, keyGalpao: any, keyUsuario: any, usuario: any){
    setTimeout( () => { this.dbService.editaGalpaoUsuario(keyUnidade, keyGalpao, keyUsuario, usuario) }, 10000);
  }

  jaExisteUsuario(keyGalpao:any){
    const snapshotToArrayGalpaoSelecionado = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => {
         let usuario = element.val();
         usuario.key = element.key;
         returnArray.push(usuario.cpf);
         returnArray.push(usuario.nome);
         returnArray.push(usuario.sobrenome); 
      });
      return returnArray;
    }
    this.ref.child(this.keyUnidade+'/unidadesGalpao/'+keyGalpao+'/usuarios/').on('value', resp => {
      this.usuariosNoGalpao = snapshotToArrayGalpaoSelecionado(resp);
    })
    if(this.usuariosNoGalpao.length > 0){
      var i = 0;
      var mensagem:string='';
      while(i < this.usuariosNoGalpao.length){
        var j = i+1;
        var k = j+1;
        mensagem += this.usuariosNoGalpao[j].toString() + ' ' + this.usuariosNoGalpao[k].toString() + ' CPF ' + this.usuariosNoGalpao[i].toString() + '. \n|| '
        i = k+1;
      }
      const loading = this.loadingCtrl.create({
        content: 'Verificando...'
      });
      loading.present().then((data) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          subTitle: 'Este galpão já está sendo administrado pelos usuários:',
          message: mensagem,
          buttons: ['Ok']});
        alert.present()})
    }
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}
