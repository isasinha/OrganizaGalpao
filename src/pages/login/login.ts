import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { HomePage } from '../home/home';
import { HomeAdmPage } from '../home-adm/home-adm';
import { RedefinirSenhaPage } from '../redefinir-senha/redefinir-senha';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email = '';
  senha = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController
    ) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    const loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();
    this.authService.login(this.email, this.senha)
                    .then((authState) => {console.log('Logou', authState);loading.dismiss();
                    if(this.email == 'admin@organizagalpao.com.br')
                      this.navCtrl.push(HomeAdmPage)
                    else
                      this.navCtrl.push(HomePage)
                    })
                    .catch((error) => {loading.dismiss(); const alert = this.alertCtrl
                    .create({
                      title:'Login falhou', 
                      message: error.message, 
                      buttons:['Ok']
                    });
                      console.log('Login falhou', error);
                      alert.present()})
  }

  redefineSenha(){
    this.navCtrl.setRoot(RedefinirSenhaPage);
  }

} 
