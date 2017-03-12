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
import { Auth } from '../providers/auth';
import { Storage } from '@ionic/storage';

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
    SignupPage,
    LoginPage,
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
    SignupPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Todos,Camara,Localsave, Ubicacion,Auth,Storage]
})
export class AppModule {}
