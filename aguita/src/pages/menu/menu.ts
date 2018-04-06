import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, NavParams } from 'ionic-angular';
import { MapasnativoPage } from '../../pages/mapasnativo/mapasnativo';
import { HomePage } from '../../pages/home/home';
import { Wheel } from '../../pages/wheel/wheel';
import { Mapajshtml } from '../../pages/mapajshtml/mapajshtml';
import { SignupPage } from '../../pages/signup-page/signup-page';
import { MisRegistrosPage } from '../../pages/mis-registros/mis-registros';
import { LoginPage } from '../../pages/login-page/login-page';
import { IntroPage } from '../../pages/intro/intro';
import { TutorialPage } from '../../pages/tutorial/tutorial';
import { MapaGeneralPage } from '../../pages/mapa-general/mapa-general';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { MenuController } from 'ionic-angular';
import { UsuarioPage } from '../../pages/usuario/usuario';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  pagesUser: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController,
    public authService: Auth,
    public app: App,
    public storage: Storage,
    public navParams: NavParams) {

    this.pagesUser = [
      { title: 'Mapa General', component: MapaGeneralPage },
      { title: 'Tutorial', component: TutorialPage },
      { title: 'Usuarios', component: UsuarioPage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }

  logout() {
    console.log('saliendo logout');
    this.authService.logout().then(() => {
      console.log('listo borrado, dirijiendo a registrar');
      this.app.getRootNav().setRoot( LoginPage );
    });
  }

  mapa(){
    this.navCtrl.setRoot(MapaGeneralPage);
  }

  tutorial(){
    this.navCtrl.setRoot(TutorialPage);
  }

  verUsuario() {
    this.storage.get('idUsuario').then((idUsuario) => {
      this.navCtrl.push(UsuarioPage, { idUsuario });
    });
  }
}
