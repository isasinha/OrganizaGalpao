import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'LoginPage';
  paginaAtiva: any;

  paginas: Array<{titulo: string, pagina: any, icon: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public firebaseauth: AngularFireAuth) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.paginas = [
        {titulo: 'Sair', pagina: LoginPage, icon:'log-out'}
      ];

      this.paginaAtiva = this.paginas[0];
    });
  }

  abrePagina(pagina){
    if (pagina.titulo == 'Sair'){
      this.firebaseauth.auth.signOut();
    }  
      this.nav.push(pagina.pagina);
      this.paginaAtiva = pagina;
  }

  veSeEstaAtivo(pagina){
    return pagina == this.paginaAtiva;
  }

}

