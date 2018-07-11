import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../../pages/login-page/login-page';
import { TutorialPage } from '../../pages/tutorial/tutorial';
import { MapaGeneralPage } from '../../pages/mapa-general/mapa-general';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { UsuarioPage } from '../../pages/usuario/usuario';
import { App } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { Information } from './information';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  pagesUser: Array<{ title: string, component: any }>;
  protocoloDeMuestreo: any;

  constructor(public navCtrl: NavController,
    public authService: Auth,
    public app: App,
    public imageViewerCtrl: ImageViewerController,
    public storage: Storage,
    public navParams: NavParams) {
    this.protocoloDeMuestreo = '../../assets/img/protocoloDeMuestreo.jpg';

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
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  mapa() {
    this.navCtrl.setRoot(MapaGeneralPage);
  }

  tutorial() {
    this.navCtrl.setRoot(TutorialPage);
  }

  presentImage() {
    let img = document.createElement("img");
    img.src = this.protocoloDeMuestreo;
    img.id = "picture";
    const imageViewer = this.imageViewerCtrl.create(img);
    imageViewer.present();
  }

  abrirModal() {
    this.navCtrl.push(Information);
  }

  verUsuario() {
    this.storage.get('idUsuario').then((idUsuario) => {
      this.navCtrl.push(UsuarioPage, { idUsuario });
    });
  }
}


