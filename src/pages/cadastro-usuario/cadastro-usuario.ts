import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { HomeAdmPage } from '../home-adm/home-adm';

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

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
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }



  novoUsuario(){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();
    this.authService.confirmaNovoUsuario(this.email, this.senha)
                    .then((data) => {
                      loading.dismiss();
                      this.navCtrl.setRoot(HomeAdmPage);})
                    .catch((error) => {
                      loading.dismiss();
                      const alert = this.alertCtrl.create({
                        title: 'Cadastro de usuário falhou',
                        message: error.message,
                        buttons: ['Ok']});
                      alert.present();})
  }

  voltar(){
    this.navCtrl.setRoot(HomeAdmPage)
  }
  
}
