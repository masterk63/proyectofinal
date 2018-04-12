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
  rootPage:any = DashboardPage;
  pages: Array<{tituloPrincipal: string,iconoPrincipal: string,mostrarComponentes: boolean, componenentes: Array<{titulo: string,icono: string, componente: any}>}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { tituloPrincipal: 'Usuarios',iconoPrincipal:'people',mostrarComponentes:false, componenentes: [{titulo:'Listar',icono:'list',componente:ListaUsuariosPage}] },
      { tituloPrincipal: 'Registros',iconoPrincipal:'book',mostrarComponentes:false, componenentes: [{titulo:'Listar',icono:'list',componente:ListaRegistrosPage},{titulo:'Nuevo',icono:'person-add',componente:DashboardPage}] },
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public mostrarElementos(aux){
    aux.mostrarComponentes = !aux.mostrarComponentes;
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

}

