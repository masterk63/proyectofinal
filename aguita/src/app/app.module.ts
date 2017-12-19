//Angular
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';

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
import { ConnectivityService } from '../providers/connectivity-service';
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

//Importaciones
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';
// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Storage } from '@ionic/storage';


//Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
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
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Ir Atras',
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Todos,Camara,Localsave,Ubicacion,Auth,UsuariosService,ConnectivityService,RegistrosService,Storage,
    LocalSqlProvider]
})
export class AppModule {}
