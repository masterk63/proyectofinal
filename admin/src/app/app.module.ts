import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Pages
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListaRegistrosPage } from '../pages/lista-registros/lista-registros';
import { ListaUsuariosPage } from '../pages/lista-usuarios/lista-usuarios';

//Providers
import { Auth } from '../providers/auth';
import { RegistrosService } from '../providers/registrosService';
import { Ubicacion } from '../providers/ubicacion';
import { UsuariosService } from '../providers/usuariosService';

//Table Materialize
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../providers/getSpanishPaginatorIntl';
import {MatPaginatorIntl, MatCheckboxModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';

//Date Materialize
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

//Form Input Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

//Tabs Material
import {MatTabsModule} from '@angular/material/tabs';

//Button 
import {MatButtonModule} from '@angular/material/button';

//Icon
import {MatIconModule} from '@angular/material/icon';

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
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatButtonModule,
    HttpModule,
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
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosService,
    Ubicacion,
    RegistrosService,
    Auth
  ]
})
export class AppModule {}
