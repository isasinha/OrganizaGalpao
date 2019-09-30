import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService} from './auth.service';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RedefinirSenhaPage } from '../pages/redefinir-senha/redefinir-senha';
import { CadastroGalpaoPage } from '../pages/cadastro-galpao/cadastro-galpao';
import { CadastroUnidadePage } from '../pages/cadastro-unidade/cadastro-unidade';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';
import { CadastroAdminPage } from '../pages/cadastro-admin/cadastro-admin';
import { ExcluirGalpaoPage } from '../pages/excluir-galpao/excluir-galpao';
import { ExcluirUnidadePage } from '../pages/excluir-unidade/excluir-unidade';
import { ExcluirUsuarioPage } from '../pages/excluir-usuario/excluir-usuario';
import { ExcluirAdminPage } from '../pages/excluir-admin/excluir-admin';
import { LimparGalpaoPage } from '../pages/limpar-galpao/limpar-galpao';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { HomeAdmPageModule } from '../pages/home-adm/home-adm.module';
import { LoginPage } from '../pages/login/login';
import { ContatoPage } from '../pages/contato/contato';
import { GalpoesPage } from '../pages/galpoes/galpoes';
import { UnidadesPage } from '../pages/unidades/unidades';
import { OpcaoUnidadesPage } from '../pages/opcao-unidades/opcao-unidades';
import { OpcaoGalpoesPage } from '../pages/opcao-galpoes/opcao-galpoes';
import { OpcaoUsuariosPage } from '../pages/opcao-usuarios/opcao-usuarios';
import { OpcaoGestaoAdminPage } from '../pages/opcao-gestao-admin/opcao-gestao-admin';
import { AlterarUnidadePage } from '../pages/alterar-unidade/alterar-unidade';
import { AlterarGalpaoPage } from '../pages/alterar-galpao/alterar-galpao';
import { AlterarUsuarioPage } from '../pages/alterar-usuario/alterar-usuario';
import { AlterarAdminPage } from '../pages/alterar-admin/alterar-admin';
//import undefined from 'firebase/empty-import';



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
    LoginPage,
    RedefinirSenhaPage,
    CadastroGalpaoPage,
    CadastroUnidadePage,
    CadastroUsuarioPage,
    CadastroAdminPage,
    AlterarUnidadePage,
    AlterarGalpaoPage,
    AlterarUsuarioPage,
    AlterarAdminPage,
    ExcluirGalpaoPage,
    ExcluirUnidadePage,
    ExcluirUsuarioPage,
    ExcluirAdminPage,
    LimparGalpaoPage,
    ContatoPage,
    UnidadesPage,
    GalpoesPage,
    OpcaoUnidadesPage,
    OpcaoGalpoesPage,
    OpcaoUsuariosPage,
    OpcaoGestaoAdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HomeAdmPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,   
    LoginPage, 
    RedefinirSenhaPage,
    CadastroGalpaoPage,
    CadastroUnidadePage,
    CadastroUsuarioPage,
    CadastroAdminPage,
    AlterarUnidadePage,
    AlterarGalpaoPage,
    AlterarUsuarioPage,
    AlterarAdminPage,
    ExcluirGalpaoPage,
    ExcluirUnidadePage,
    ExcluirUsuarioPage,
    ExcluirAdminPage,
    LimparGalpaoPage,
    ContatoPage,
    UnidadesPage,
    GalpoesPage,
    OpcaoUnidadesPage,
    OpcaoGalpoesPage,
    OpcaoUsuariosPage,
    OpcaoGestaoAdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AngularFireDatabase,
    FirebaseServiceProvider
  ]
})
export class AppModule {}
