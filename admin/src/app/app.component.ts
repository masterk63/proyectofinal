import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListaRegistrosPage } from '../pages/lista-registros/lista-registros';
import { ListaUsuariosPage } from '../pages/lista-usuarios/lista-usuarios';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = ListaRegistrosPage;
  pages: Array<{tituloPrincipal: string,iconoPrincipal: string,activo: boolean, componenentes: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { tituloPrincipal: 'Usuarios',iconoPrincipal:'face',activo:false, componenentes:ListaUsuariosPage},
      { tituloPrincipal: 'Registros',iconoPrincipal:'assignment',activo:true, componenentes: ListaRegistrosPage},
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  openPage(page) {
    for(let p of this.pages){
      p.activo = false;
    }
    page.activo = true;
    this.nav.setRoot(page.componenentes);
  }

}

