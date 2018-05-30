import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Storage } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';

//Pages
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListaRegistrosPage } from '../pages/lista-registros/lista-registros';
import { ListaUsuariosPage } from '../pages/lista-usuarios/lista-usuarios';
import { RegistroPage } from '../pages/registro/registro'
import { UsuarioPage } from '../pages/usuario/usuario'
import { ListaRegistrosPageUsuario } from '../pages/lista-registros-usuario/lista-registros-usuario';
import { LoginPage } from '../pages/login-page/login-page';


//Components 
import {HeaderComponent} from '../components/header/header';

//Providers
import { Auth } from '../providers/auth';
import { RegistrosService } from '../providers/registrosService';
import { Ubicacion } from '../providers/ubicacion';
import { UsuariosService } from '../providers/usuariosService';

//Table Materialize
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../providers/getSpanishPaginatorIntl';
import { MatPaginatorIntl, MatCheckboxModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

//Date Materialize
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

//Form Input Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

//Tabs Material
import { MatTabsModule } from '@angular/material/tabs';

//Button 
import { MatButtonModule } from '@angular/material/button';

//Icon
import { MatIconModule } from '@angular/material/icon';

//SideNavBar
import { MatSidenavModule } from '@angular/material/sidenav';

//Chip
import {MatChipsModule} from '@angular/material/chips';

//ToolTip
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    ListaRegistrosPage,
    RegistroPage,
    UsuarioPage,
    LoginPage,
    HeaderComponent,
    ListaRegistrosPageUsuario,
    ListaUsuariosPage
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatSortModule,
    MatChipsModule,
    MatCheckboxModule,
    IonicImageViewerModule,
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
    RegistroPage,
    UsuarioPage,
    HeaderComponent,
    LoginPage,
    ListaRegistrosPageUsuario,
    ListaUsuariosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsuariosService,
    Ubicacion,
    RegistrosService,
    Auth
  ]
})
export class AppModule { }
