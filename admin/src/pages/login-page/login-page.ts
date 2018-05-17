import { Component } from '@angular/core';
import { ToastController, Platform, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListaRegistrosPage } from '../lista-registros/lista-registros'

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  username: string;
  password: string;
  loading: any;
  sliderOptions: any;
  tam: any;
  width: any;
  fotoIntro: any;
  urlImg: string;
  titulo = 'Aguita'

  constructor(public navCtrl: NavController,
    public plt: Platform,
    public authService: Auth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private menu: MenuController,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {

    this.menu.enable(false);
    this.menu.swipeEnable(false);

    this.sliderOptions = {
      pager: true
    };

    this.width = plt.width();
    if (this.width <= 320) {
      this.tam = "170% 100%";
    } else if (this.width <= 450) {
      this.tam = "140% 100%";
    } else if (this.width <= 600) {
      this.tam = "110% 100%";
    } else if (this.width > 600) {
      this.tam = "100% 100%";
      if (this.width > 768) {
        this.titulo = "Ingresá tus datos para operar";
      }
    }

    if (this.plt.is('cordova')) {
      this.urlImg = '../www/'
    } else {
      this.urlImg = '../'
    }
    this.fotoIntro = this.urlImg + "assets/img/cascadaRioNoque.jpg";
  }

  shouldShow() {
    return true;
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }

  login() {
    this.showLoader();

    let credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).then((result: any) => {
      this.loading.dismiss();
      this.presentToast();
      this.navCtrl.setRoot(ListaRegistrosPage);
    }, (err) => {
      this.loading.dismiss();
      if (err.status === 0) {
        this.mostrarAlerta('Error', 'No se puede comunicar con el servidor')
      } else {
        this.mostrarAlerta('Error', 'Hay un error en el Usuario o Contraseña')
      }
      console.log(err);
    });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Inciando sesión...'
    });
    this.loading.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Ha iniciado sesion de manera correcta',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  mostrarAlerta(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

}