import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { MapasjsPage } from '../pages/mapasjs/mapasjs';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
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
    Page1,
    Page2,
    MapasjsPage,
    MapasnativoPage,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
