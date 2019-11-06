import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})

export class ContatoPage {

  corpo: string = '';
  emailRemetente: string = '';
  telefone: string = '';
  nome: string = '';
  url:string = '';
  public contatoForm: any;
  messageNome = '';
  erroNome = false;
  messageEmail = '';
  erroEmail = false;
  messageTel = '';
  erroTel = false;
  messageMensagem = '';
  erroMensagem = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public fb: FormBuilder
    ) {
      this.contatoForm = fb.group({
        nomeF: ['', Validators.required],
        emailF: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
        mensagemF: ['', Validators.required],
        telF: null
      })

  }

  enviarContato(corpo: string, emailRemetente: string, nome: string, telefone: string){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    let {nomeF, emailF, mensagemF, telF} = this.contatoForm.controls;
    telF;
    if(!this.contatoForm.valid){
      if(!nomeF.valid){
        this.erroNome = true;
        this.messageNome = 'NOME DEVE SER PREENCHIDO';
      }else{
        this.messageNome = '';
      }
      if(!emailF.valid){
        this.erroEmail = true;
        this.messageEmail = 'E-MAIL DEVE SER PREENCHIDO NO FORMATO: nome@email.com';
      }else{
        this.messageEmail = '';
      }
      if(!mensagemF.valid){
        this.erroMensagem = true;
        this.messageMensagem = 'MENSAGEM DEVE SER PREENCHIDA';
      }else{
        this.messageMensagem = '';
      }
    }else{ 
    this.url = "https://us-central1-organizagalpao.cloudfunctions.net/sendMail?corpo=" + corpo + "&remMail=" + emailRemetente + "&nome=" + nome + "&telefone=" + telefone;
    this.http.post(this.url, JSON.stringify(corpo)).subscribe(response => {
      return console.log(JSON.stringify(response));
    });
    loading.present().then((data) => {loading.dismiss(); 
      const alert = this.alertCtrl.create({
          subTitle: 'Envio de mensagem', 
          message: 'Mensagem enviada com sucesso!',
          buttons: [{
            text: 'Ok',
            handler: () => {this.corpo = '', this.emailRemetente = '', this.nome = '', this.telefone = ''}
          }]});
        alert.present()})
      .catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          subTitle: 'Envio de mensagem',
          message: 'Envio de mensagem falhou, tente novamente',
          buttons: ['Ok']});
        alert.present();})
    }
  }

  ionViewDidLoad() {

  }

  voltar(){
    this.navCtrl.pop()
  }

  enviar(){

  }

}
