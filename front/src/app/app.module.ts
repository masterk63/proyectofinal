import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapasjsPage } from '../pages/mapasjs/mapasjs';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { HomePage } from '../pages/home/home';
import { ModalPage } from '../pages/modal/modal';
import { Todos } from '../providers/todos';
import { ClouDOPage } from '../pages/clou-do/clou-do';
import { Mapajshtml } from '../pages/mapajshtml/mapajshtml';
import { SlidePage } from '../pages/slide/slide';
import { Paso2Page } from '../pages/paso2/paso2';
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';
import { Camara } from '../providers/camara';
import { Localsave } from '../providers/localsave';
import { Ubicacion } from '../providers/ubicacion';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';
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
    ClouDOPage,
    Mapajshtml,
    SlidePage,
    Paso2Page,
    Wheel,
    SignupPage,
    MisRegistrosPage,
    LoginPage,
    IntroPage,
    TutorialPage,
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
    ClouDOPage,
    Mapajshtml,
    SlidePage,
    Paso2Page,
    LoginPage,
    Wheel,
    SignupPage,
    MisRegistrosPage,
    IntroPage,
    TutorialPage,
  ],
  providers: [StatusBar,
              SplashScreen,{provide: ErrorHandler, useClass: IonicErrorHandler},Todos,Camara,Localsave, Ubicacion,Auth,Storage]
})
export class AppModule {}
