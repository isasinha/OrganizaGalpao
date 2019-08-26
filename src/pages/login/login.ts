import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { HomePage } from '../home/home';
import { HomeAdmPage } from '../home-adm/home-adm';
import { RedefinirSenhaPage } from '../redefinir-senha/redefinir-senha';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Usuario } from '../../app/Modelo/usuario';
import { AppStore } from '../../app/app.store';
import { Store } from '@ngrx/store';
import { LoginAction } from '../../reducer/usuario.reducer';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Usuario = {
    nome: '',
    sobrenome: '',
    cpf: '',
    senha: '',
    tipo: '',
    email: ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    private store: Store<AppStore>
    ) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(usuario: Usuario){
    const loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();
    this.authService.login(this.usuario.email, this.usuario.senha)
                    .then((authState) => {console.log('Logou', authState);loading.dismiss();
                    if(this.usuario.email == 'admin@organizagalpao.com.br')
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

  loginStore(){
    this.store.dispatch(new LoginAction(this.usuario.email, this.usuario.senha));
  }

  redefineSenha(){
    this.navCtrl.setRoot(RedefinirSenhaPage);
  }

} 
