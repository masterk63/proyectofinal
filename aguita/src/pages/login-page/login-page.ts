import { Component } from '@angular/core';
import { ToastController, Platform, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
import { MisRegistrosPage } from '../mis-registros/mis-registros';
import { TabsPage } from '../tabs/tabs';
import { Localsave } from '../../providers/localsave';
import { MenuController } from 'ionic-angular';

@Component({
    selector: 'login-page',
    templateUrl: 'login-page.html'
})
export class LoginPage {
    resultadoDelLogin: any;
    username: string;
    password: string;
    loading: any;
    sliderOptions: any;
    tam: any;
    width: any;
    fotoIntro: any;
    urlImg: string;

    constructor(public navCtrl: NavController,
        public plt: Platform,
        public authService: Auth,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public localSaveCtrl: Localsave,
        private menu: MenuController,
        public storage: Storage,
        private toastCtrl: ToastController
    ) {
        //this.menu.enable(false);
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

    ionViewDidLoad() {
        //descomentar para pagina introductoria
        // this.storage.get('intro-donea').then(done => {
        // if (!done) {
        // this.storage.set('intro-donea', true);
        // this.navCtrl.setRoot(IntroPage);
        // }
        // });

        // this.showLoader();

        // //Check if already authenticated
        // this.authService.checkAuthentication().then((res) => {
        //     console.log("Already authorized");
        //     this.loading.dismiss();
        //     this.navCtrl.setRoot(MisRegistrosPage);
        // }, (err) => {
        //     console.log("Not already authorized");
        //     this.loading.dismiss();
        // });

    }

    login() {
        this.showLoader();

        let credentials = {
            username: this.username,
            password: this.password
        };

        this.authService.login(credentials).then((result) => {
            this.resultadoDelLogin = result;
            this.loading.dismiss();
            this.presentToast();
            this.navCtrl.setRoot(TabsPage);
        }, (err) => {
            this.loading.dismiss();
            if(err.status === 0){
                this.mostrarAlerta('Error', 'No se puede comunicar con el servidor')
            }else{
                this.mostrarAlerta('Error', 'Hay un error en el Usuario o Contraseña')
            }
            console.log(err);
        });
    }

    crearCuenta() {
        this.navCtrl.push(SignupPage);
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