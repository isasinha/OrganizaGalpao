import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { HomeAdmPage } from '../home-adm/home-adm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  usuario = {
    'cpf': '',
    'senha': '',
    'tipo': '',
    'email': ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  save(usuario){
    this.dbService.save(usuario);
    this.novoUsuario(usuario);
  }

  novoUsuario(usuario){
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();
    this.authService.confirmaNovoUsuario(this.usuario.email, this.usuario.senha)
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
