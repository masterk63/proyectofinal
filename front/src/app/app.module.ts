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

@NgModule({
  declarations: [
    MyApp,
    MapasjsPage,
    MapasnativoPage,
    HomePage,
    ModalPage,
    ClouDOPage,
    Mapajshtml
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
    Mapajshtml
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Todos]
})
export class AppModule {}
