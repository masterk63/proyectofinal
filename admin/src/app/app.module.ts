import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';

//Pages
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListaRegistrosPage } from '../pages/lista-registros/lista-registros';
import { ListaUsuariosPage } from '../pages/lista-usuarios/lista-usuarios';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    ListaRegistrosPage,
    ListaUsuariosPage
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    ListaRegistrosPage,
    ListaUsuariosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
