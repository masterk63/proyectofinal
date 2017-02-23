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
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';
import { Camara } from '../providers/camara';

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
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Todos,Camara]
})
export class AppModule {}
