import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapasjsPage } from '../pages/mapasjs/mapasjs';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    MapasjsPage,
    MapasnativoPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapasjsPage,
    MapasnativoPage,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
