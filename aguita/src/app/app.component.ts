import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login-page/login-page';
import { TabsPage } from '../pages/tabs/tabs';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';
import { LocalSqlProvider } from '../providers/local-sql/local-sql';
import { SocketProvider } from '../providers/socket/socket';
import { ConnectivityService } from '../providers/connectivityService';
import { Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { MapaGeneralPage } from '../pages/mapa-general/mapa-general';
import { CropperPage } from '../pages/cropper/cropper';
import { DiagnosticProvider } from '../providers/diagnostic/diagnostic';

//diagnostic para location


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  sincronizado: boolean = false;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    conexion: ConnectivityService,
    public localSQL: LocalSqlProvider,
    public scoketPrv: SocketProvider,
    public events: Events,
    private keyboard: Keyboard,
    public storage: Storage,
    splashScreen: SplashScreen,
  private diagnosticProv: DiagnosticProvider) {

    platform.ready().then(() => {

      // StyleLightContent setea el menu en blanco. para que el StatusBar
      // se pueda leer bien.. ya que nuestro menu es Rojo.
      statusBar.styleLightContent();
      splashScreen.hide();
      this.diagnosticProv.controlEnable();

      if (this.platform.is('cordova')) {
        this.localSQL.createDatabase();
        // keyboard.onKeyboardShow().subscribe(() => {
        //   console.log('se abrio el teclado')
        //   document.body.classList.add('keyboard-is-open');
        // });

        // keyboard.onKeyboardHide().subscribe(() => {
        //   document.body.classList.remove('keyboard-is-open');
        // });
      }

      this.storage.get('token').then((token) => {
        console.log('token is', token);
        if (token === '' || token === null || token === undefined) {
          this.rootPage = LoginPage;
        } else {
          this.storage.get('idUsuario').then((idUsuario) => {
            this.scoketPrv.init(idUsuario);
            this.rootPage = TabsPage;
            // this.rootPage = CropperPage;
          })
        }
      }).catch((err) => {
        console.log(err);
      });

    });
  }
}
