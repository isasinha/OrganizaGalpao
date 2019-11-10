import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
// import { Unidade, snapshotToArrayUnidade } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { snapshotToArrayUnidadeKey, snapshotToArrayGalpaoKey } from '../../app/Modelo/galpao';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-alterar-usuario',
  templateUrl: 'alterar-usuario.html',
})
export class AlterarUsuarioPage {

  usuario: Usuario = {
    nome: null,
    sobrenome: null,
    cpf: null,
    email: null,
    senha: null,
    tipo: null
  };

  usuarioSelecionado = [];
  usuarioGalpaoSelecionado = [];
  usuarioDados = [];
  usuarioCpf;
  usuarioKey;
  unidadesKey = [];
  galpoesKey = [];
  refUser = firebase.database().ref('/usuario/');
  refUni = firebase.database().ref('/unidade/');
  public usuarioForm: any;
  messageUsuario = '';
  erroUsuario = false;
  messageEmail = '';
  erroEmail = false;
  public usuarioCpfForm: any;
  messageUsuarioCpf = '';
  erroUsuarioCpf = false;
  semUsuario = false;
  messageSemUsuario = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.usuarioForm = fb.group({
        nome: null,
        sobrenome: null,
        email: ['', Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')],
        cpf: null
      })
      this.usuarioCpfForm = fb.group({
        cpf: ['', Validators.required]
      })
  }

  ionViewDidLoad() {
    this.refUni.on('value', resp => {
      this.unidadesKey = snapshotToArrayUnidadeKey(resp);
    })
  }


  selecionaUsuario(usuarioCpf: any){
    this.semUsuario = false;
    this.erroUsuarioCpf = false;
    const snapshotToArrayUsuarioCPF = snapshot => {
      let returnArray = [];
      snapshot.forEach(element => { 
        let usuarioBanco = element.val();
        usuarioBanco.key = element.key;
        if(usuarioBanco.tipo == 'Usuario'){
          if(usuarioCpf == usuarioBanco.cpf){
            returnArray.push(usuarioBanco);
            this.usuarioKey = usuarioBanco.key;
          } 
        }
      });
      return returnArray;
    }
    this.refUser.on('value', resp => {
      this.usuarioSelecionado = snapshotToArrayUsuarioCPF(resp);
    })
  }

  alteraUsuario(usuario: Usuario){
    this.semUsuario = false;
    let {cpf} = this.usuarioCpfForm.controls;
    if(!this.usuarioCpfForm.valid){
      if(!cpf.valid){
        this.erroUsuarioCpf = true;
        this.messageUsuarioCpf = 'CPF DEVE SER PREENCHIDO';
      }else{
        this.messageUsuarioCpf = '';
      }
    }else if(this.usuarioSelecionado.length <= 0){
      this.messageUsuarioCpf = '';
      this.semUsuario = true;
      this.messageSemUsuario = 'NENHUM ADMINISTRADOR ENCONTRADO COM ESSE CPF';
    }else{
      this.messageUsuarioCpf = '';
      let {nome, sobrenome, email, cpf} = this.usuarioForm.controls;
      if(!this.usuarioForm.valid){
        if(!email.valid){
          this.erroEmail = true;
          this.messageEmail = 'E-MAIL DEVE SER PREENCHIDO NO FORMATO: nome@email.com';
        }else{
          this.messageEmail = '';
        }
      }else{
        this.messageUsuarioCpf = '';
        if(!nome.value && !sobrenome.value && !email.value && !cpf.value){
          this.usuarioForm.status = 'INVALID';
          if(!this.usuarioForm.valid){
            this.erroUsuario = true;
            this.messageUsuario = 'AO MENOS 1 ITEM DEVE SER ALTERADO';
          }else{
            this.messageUsuario = '';
          }
        }else{
          this.dbService.editaUsuario(this.usuarioKey, usuario);    var i = 0;
          const loading = this.loadingCtrl.create({
            content: 'Alterando...'
          });
          var keyUni = '';
          while(i < this.unidadesKey.length){
            keyUni = this.unidadesKey[i];
            this.refUni.child(keyUni+'/unidadesGalpao/').on('value', resp => {
              this.galpoesKey = snapshotToArrayGalpaoKey(resp);
            })
            var j=0;
            for(j=0; j < this.unidadesKey.length; j++){
              var k=0;
              var uniSeleKey = this.unidadesKey[j];
              for(k=0; k < this.galpoesKey.length; k++){
                var galSeleKey = this.galpoesKey[k];
                const snapshotToArrayUsuarioGalpao = snapshot => {
                  snapshot.forEach(element => {
                    let usuarioBanco = element.val();
                    usuarioBanco.key = element.key;
                    if(this.usuarioKey == usuarioBanco.key){
                      this.dbService.editaGalpaoUsuario(uniSeleKey, galSeleKey, this.usuarioKey, usuario);
                    } 
                  });
                }
                this.refUni.child(uniSeleKey+'/unidadesGalpao/'+galSeleKey+'/usuarios/').on('value', resp => {
                  snapshotToArrayUsuarioGalpao(resp);
                })
                // k++;
              // }
              }
            }
            i++;
          }
          loading.present().then((data) => {loading.dismiss(); const alert = this.alertCtrl.create({
                            subTitle: 'Alteração de Usuário',
                            message: 'Usuário alterado com sucesso!',
                            buttons: ['Ok']});
                          alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))})
                        .catch((error) => {loading.dismiss(); const alert = this.alertCtrl.create({
                            subTitle: 'Alteração de usuário falhou',
                            message: error.message,
                            buttons: ['Ok']});
                          alert.present();});
        }
      }
    }
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}