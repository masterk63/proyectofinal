import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
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
  urlImg:any;
  constructor(public navCtrl: NavController,
    public authService: Auth,
    public app: App,
    public imageViewerCtrl: ImageViewerController,
    public storage: Storage,
    public plt: Platform,
    public navParams: NavParams) {
     
    if (this.plt.is('cordova')) {
      this.urlImg = '../www/'
    } else {
      this.urlImg = '../'
    }
    this.protocoloDeMuestreo = this.urlImg + "assets/img/protocoloDeMuestreo.jpg";

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
    this.app.getRootNav().push(page.component);
  }

  logout() {
    console.log('saliendo logout');
    this.authService.logout().then(() => {
      console.log('listo borrado, dirijiendo a registrar');
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  mapa() {
    this.app.getRootNav().push(MapaGeneralPage);
  }

  tutorial() {
    this.app.getRootNav().push(TutorialPage);
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
      this.app.getRootNav().push(UsuarioPage, { idUsuario });
    });
  }
}


