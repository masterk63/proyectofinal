import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login-page/login-page';
import { TabsPage } from '../pages/tabs/tabs';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform, statusBar: StatusBar,
    public storage: Storage,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('token').then((token) => {
        console.log('token is', token);
        if (token === '' || token === null || token === undefined) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = TabsPage;
        }
      }).catch((err) => {
        console.log(err);
      });

    });
  }
}
