import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContatoPage } from '../pages/contato/contato';
import { UnidadesPage } from '../pages/unidades/unidades';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'LoginPage';
  paginaAtiva: any;

  paginas: Array<{titulo: string, pagina: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.paginas = [
        {titulo: 'Contato', pagina: ContatoPage},
        {titulo: 'Unidades', pagina: UnidadesPage},
        {titulo: 'Sair', pagina: LoginPage}
      ];

      this.paginaAtiva = this.paginas[0];
    });
  }

  abrePagina(pagina){
    this.nav.setRoot(pagina.pagina);
    this.paginaAtiva = pagina;
  }

  veSeEstaAtivo(pagina){
    return pagina == this.paginaAtiva;
  }
}

