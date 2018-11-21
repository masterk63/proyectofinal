import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';
import { LocalSqlProvider } from '../providers/local-sql/local-sql';
import { SocketProvider } from '../providers/socket/socket';
import { Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { MapaGeneralPage } from '../pages/mapa-general/mapa-general';
import { CropperPage } from '../pages/cropper/cropper';
import { DiagnosticProvider } from '../providers/diagnostic/diagnostic';
import { Wheel } from '../pages/wheel/wheel';
import { MenuPage } from '../pages/menu/menu';

//diagnostic para location


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = MapaGeneralPage;
  sincronizado: boolean = false;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
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

    });
  }
}
