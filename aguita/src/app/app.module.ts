//Angular
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login-page/login-page';
import { MapaGeneralPage } from '../pages/mapa-general/mapa-general';
import { Mapajshtml } from '../pages/mapajshtml/mapajshtml';
import { ModalPage } from '../pages/modal/modal';
import { SignupPage } from '../pages/signup-page/signup-page';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { Wheel } from '../pages/wheel/wheel';
import { RegistroPage } from '../pages/registro/registro';
import { UsuarioPage } from '../pages/usuario/usuario';
import { MenuPage } from '../pages/menu/menu';

// Providers
import { Todos } from '../providers/todos';
import { Camara } from '../providers/camara';
import { Localsave } from '../providers/localsave';
import { Ubicacion } from '../providers/ubicacion';
import { ConnectivityService } from '../providers/connectivityService';
import { UsuariosService } from '../providers/usuariosService';
import { RegistrosService } from '../providers/registrosService';
import { Auth } from '../providers/auth';
import { LocalSqlProvider } from '../providers/local-sql/local-sql';


//Provaider NativeComponents
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Keyboard } from '@ionic-native/keyboard';

//Importaciones
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';
// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Storage } from '@ionic/storage';


//Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DiagnosticProvider } from '../providers/diagnostic/diagnostic';
import { SocketProvider } from '../providers/socket/socket';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    IntroPage,
    UsuarioPage,
    LoginPage,
    SwipeVertical,
    MapaGeneralPage,
    Mapajshtml,
    ModalPage,
    SignupPage,
    MenuPage,
    MapasnativoPage,
    MapasnativoPage,
    MisRegistrosPage,
    TutorialPage,
    Wheel,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: "md",
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'md-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    IntroPage,
    LoginPage,
    MapaGeneralPage,
    Mapajshtml,
    ModalPage,
    MenuPage,
    SignupPage,
    MapasnativoPage,
    MapasnativoPage,
    MisRegistrosPage,
    TutorialPage,
    Wheel,
    RegistroPage,
    HomePage,
    TabsPage
  ],
  providers: [
    File,
    FileTransfer,
    Camera,
    FilePath,
    Network,
    PhotoViewer,
    StatusBar,
    SplashScreen,
    SQLite,
    Geolocation,
    Diagnostic,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Todos,Camara,Localsave,Ubicacion,Auth,UsuariosService,ConnectivityService,RegistrosService,Storage,
    LocalSqlProvider,
    DiagnosticProvider,
    SocketProvider]
})
export class AppModule {}
