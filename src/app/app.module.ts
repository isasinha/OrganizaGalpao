import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService} from './auth.service'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomeAdmPage } from '../pages/home-adm/home-adm';
import { RedefinirSenhaPage } from '../pages/redefinir-senha/redefinir-senha';
import { CadastroGalpaoPage } from '../pages/cadastro-galpao/cadastro-galpao';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';
import { ExcluirGalpaoPage } from '../pages/excluir-galpao/excluir-galpao';
import { ExcluirUsuarioPage } from '../pages/excluir-usuario/excluir-usuario';
import { LimparGalpaoPage } from '../pages/limpar-galpao/limpar-galpao';
import { ContatoPage } from '../pages/contato/contato';
import { UnidadesPage } from '../pages/unidades/unidades';
import { LoginPage } from '../pages/login/login';

const firebaseConfig = {
  apiKey: " AIzaSyAZgCNfWAcgwBjuoUfWeilZk-9Mv7CZLVk ",
  authDomain: "organizagalpao.firebaseapp.com",
  databaseURL: "https://organizagalpao.firebaseio.com",
  projectId: "organizagalpao",
  storageBucket: "organizagalpao.appspot.com",
  messagingSenderId: "project-866109900277",
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeAdmPage,
    RedefinirSenhaPage,
    CadastroGalpaoPage,
    CadastroUsuarioPage,
    ExcluirGalpaoPage,
    ExcluirUsuarioPage,
    LimparGalpaoPage,
    ContatoPage,
    UnidadesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeAdmPage,
    RedefinirSenhaPage,
    CadastroGalpaoPage,
    CadastroUsuarioPage,
    ExcluirGalpaoPage,
    ExcluirUsuarioPage,
    LimparGalpaoPage,
    ContatoPage,
    UnidadesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AngularFireDatabase
  ]
})
export class AppModule {}
