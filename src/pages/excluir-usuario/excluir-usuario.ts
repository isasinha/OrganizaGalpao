import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomeAdmPage } from '../home-adm/home-adm';
// import { Galpao, Unidade, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Usuario } from '../../app/Modelo/usuario';
import { snapshotToArrayUnidadeKey, snapshotToArrayGalpaoKey, snapshotToArrayUnidade, snapshotToArrayGalpao } from '../../app/Modelo/galpao';
import { FormBuilder, Validators } from '@angular/forms';
// import { UnidadesPage } from '../unidades/unidades';

@IonicPage()
@Component({
  selector: 'page-excluir-usuario',
  templateUrl: 'excluir-usuario.html',
})
export class ExcluirUsuarioPage {

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
  unidadesExc=[];
  unidades = [];
  galpoes = [];
  unidadesKey = [];
  galpoesKey = [];
  unidadesNome = [];
  galpoesNome = [];
  unidadeGalpao = [];
  galpaoUnidade = [];
  mensagem:Array<any> = []; 
  public usuarioForm: any;
  messageUsuario = '';
  erroUsuario = false;
  messageSelecao = '';
  erroSelecao = false;


  refUser = firebase.database().ref('/usuario/');
  refUni = firebase.database().ref('/unidade/');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    // private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase,
    public fb: FormBuilder
    ) {
      this.usuarioForm = fb.group({
        user: ['', Validators.required],
        selecao: [false, this.validaSelecao]
      })
  }

  ionViewDidLoad() {
    this.refUni.on('value', resp => {
      this.unidades = snapshotToArrayUnidade(resp)
      this.unidadesKey = snapshotToArrayUnidadeKey(resp);
    })
  }


  selecionaUsuario(usuarioCpf: any){
    this.unidadeGalpao = [];
    this.galpaoUnidade = [];
    this.usuarioKey = [];
    this.mensagem = [];
    this.galpoesKey = [];
    this.galpoes = [];
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
    // var i = 0;
    // var keyUni = '';

    // const loading = this.loadingCtrl.create({
    //   content: 'Excluindo...'
    // });
    var j = 0;
    var m = 0;
    for(j=0; j < this.unidadesKey.length; j++){
      var k = 0;
      var uniSeleKey = this.unidadesKey[j];
      var unis = this.unidades[j];
      // keyUni = this.unidadesKey[i];
      this.refUni.child(uniSeleKey+'/unidadesGalpao/').on('value', resp => {
        this.galpoes = snapshotToArrayGalpao(resp);
        this.galpoesKey = snapshotToArrayGalpaoKey(resp);
      })
      for(k=0; k < this.galpoesKey.length; k++){
        var galSeleKey = this.galpoesKey[k];
        var gals = this.galpoes[k];
        const snapshotToArrayUsuarioGalpao = snapshot => {
          snapshot.forEach(element => {
            let usuarioBanco = element.val();
            usuarioBanco.key = element.key;
            if(this.usuarioKey == usuarioBanco.key){ 
              this.unidadeGalpao = unis.nomeUnidade;
              this.galpaoUnidade = gals.nomeGalpao;
              this.mensagem[m]= {unidade: this.unidadeGalpao, galpao: this.galpaoUnidade, uniKey: uniSeleKey, galKey: galSeleKey}; 
              m++;
            } 
          });
        }
        this.refUni.child(uniSeleKey+'/unidadesGalpao/'+galSeleKey+'/usuarios/').on('value', resp => {
          snapshotToArrayUsuarioGalpao(resp);
        })
      }
    }
  }

  deletaUsuario(mensagem: any){
    let {user, selecao} = this.usuarioForm.controls;
    if(!this.usuarioForm.valid){
      if(!user.valid){
        this.erroUsuario = true;
        this.messageUsuario = 'CPF DEVE SER PREENCHIDO';
      }else{
        this.messageUsuario = '';
        if(!selecao.valid){
          this.erroSelecao = true;
          this.messageSelecao = 'AO MENOS 1 GALPÃO DEVE SER SELECIONADO';
        }else{
          this.messageSelecao = '';
        }
      }
    }else{
      var m = 0;
      var s = 0;
      while(m < mensagem.length){
        if(mensagem[m].isChecked == true){
          var uniKey = mensagem[m].uniKey;
          var galKey = mensagem[m].galKey;
          var usuarioGalpao = ''
          var arrayUsuarios = [];
          this.refUni.child('/'+uniKey+'/unidadesGalpao/'+galKey+'/usuarios').on('value', snapshot => {
            snapshot.forEach(element => {
              usuarioGalpao = element.val();
              arrayUsuarios.push(usuarioGalpao);
            });
          })
          if(arrayUsuarios.length==1){
            const alert = this.alertCtrl.create({
              subTitle: 'Este é o único usuário administrando este galpão, caso não haja nenhum administrador, todos os itens nele cadastrados serão excluídos!',
              message: 'Deseja prosseguir com a exclusão?',
              buttons: [
                {
                  text: 'Cancelar'
                },
                {
                  text: 'Sim',
                  handler: () => {
                    this.refUni.child('/'+uniKey+'/unidadesGalpao/'+galKey+'/usuarios/'+this.usuarioKey).remove();
                    this.dbService.excluiIdentificacaoGalpaoUsuario(this.usuarioKey, galKey);
                    this.dbService.renovaPosicao(uniKey, galKey);
                    const alert = this.alertCtrl.create({
                      subTitle: 'Exclusão de Usuário',
                      message: 'Usuário excluído com sucesso!',
                      buttons: ['Ok']});
                    alert.present().then(r => this.navCtrl.setRoot('HomeAdmPage'))
                      .catch((error) => {
                        const alert = this.alertCtrl.create({
                          subTitle: 'Exclusão de Usuário falhou',
                          message: error.message,
                          buttons: ['Ok']});
                        alert.present();});
                  } 
                }
              ]
            });
            alert.present()
            .catch((error) => {
              const alert = this.alertCtrl.create({
                subTitle: 'Cadastro de galpão falhou',
                message: error.message,
                buttons: ['Ok']});
              alert.present();})
          } 
          s++;
        }
        m++;
      }
      if(s == mensagem.length){
        this.dbService.excluiUsuario(this.usuarioKey);
      }
     
    }  
  }

  validaSelecao(c: any): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }

}