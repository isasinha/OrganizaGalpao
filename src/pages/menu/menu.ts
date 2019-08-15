import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, Nav, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContatoPage } from '../contato/contato';
import { UnidadesPage } from '../unidades/unidades';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  paginaAtiva: any;
  paginas: Array<{titulo: string, pagina: any}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
    ) {
   // platform.ready().then(() => {statusBar.styleDefault();
    //                             splashScreen.hide();

    this.paginas = [
      {titulo: 'Contato', pagina: ContatoPage},
      {titulo: 'Unidades', pagina: UnidadesPage},
      {titulo: 'Sair', pagina: LoginPage}
    ];
  
    this.paginaAtiva = this.paginas[0];
  //  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  abrePagina(pagina){
    this.nav.setRoot(pagina.pagina);
    this.paginaAtiva = pagina;
  }

  veSeEstaAtivo(pagina){
    return pagina == this.paginaAtiva;
  }

}
