import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapasjsPage } from '../pages/mapasjs/mapasjs';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { HomePage } from '../pages/home/home';
import { ModalPage } from '../pages/modal/modal';
import { Todos } from '../providers/todos';
import { Mapajshtml } from '../pages/mapajshtml/mapajshtml';
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';
import { Camara } from '../providers/camara';
import { Localsave } from '../providers/localsave';
import { Ubicacion } from '../providers/ubicacion';
import { UsuariosService } from '../providers/usuariosService';
import { RegistrosService } from '../providers/registrosService';
import { LoginPage } from '../pages/login-page/login-page';
import { UsuarioPage } from '../pages/usuario/usuario';
import { UsuariosGestorPage } from '../pages/usuarios-gestor/usuarios-gestor';
import { SignupPage } from '../pages/signup-page/signup-page';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';
import { RegistrosGestorPage } from '../pages/registros-gestor/registros-gestor';
import { Wheel } from '../pages/wheel/wheel';
import { IntroPage } from '../pages/intro/intro';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { Auth } from '../providers/auth';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MapasjsPage,
    MapasnativoPage,
    HomePage,
    ModalPage,
    Mapajshtml,
    Wheel,
    SignupPage,
    MisRegistrosPage,
    LoginPage,
    IntroPage,
    TutorialPage,
    UsuarioPage,
    UsuariosGestorPage,
    RegistrosGestorPage,
    SwipeVertical //OJO, Swipe Vertical es una directiva, solo va aqui y se importa arriba, no va abajo en bootstrap!
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapasjsPage,
    MapasnativoPage,
    HomePage,
    ModalPage,
    Mapajshtml,
    LoginPage,
    Wheel,
    SignupPage,
    MisRegistrosPage,
    IntroPage,
    TutorialPage,
    UsuarioPage,
    UsuariosGestorPage,
    RegistrosGestorPage,
  ],
  providers: [StatusBar,
              SplashScreen,{provide: ErrorHandler, useClass: IonicErrorHandler},Todos,Camara,Localsave,Ubicacion,Auth,UsuariosService,RegistrosService,Storage]
})
export class AppModule {}
