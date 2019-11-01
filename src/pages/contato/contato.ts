import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {
  }

  enviarContato(corpo: string, emailRemetente: string, nome: string, telefone: string){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    }); 
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

  ionViewDidLoad() {

  }

  voltar(){
    this.navCtrl.pop()
  }

  enviar(){

  }

}
