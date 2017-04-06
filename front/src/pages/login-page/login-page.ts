import { Component } from '@angular/core';
import { ToastController, Platform, NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
import { MisRegistrosPage } from '../mis-registros/mis-registros';
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
 
    constructor(public navCtrl: NavController, 
                public plt: Platform, 
                public authService: Auth, 
                public loadingCtrl: LoadingController,
                public localSaveCtrl:Localsave,
                private menu: MenuController,
                public storage: Storage,
                private toastCtrl: ToastController
                ){
                    this.menu.enable(false);
    this.sliderOptions = {
      pager: true
    };
    this.width=plt.width();
    if(this.width <= 320){
      this.tam="170% 100%";
    }else if(this.width <= 450){
      this.tam="140% 100%";
    }else if(this.width <= 600){
      this.tam="110% 100%";
    }else if(this.width > 600){
      this.tam="100% 100%";
    }
     this.fotoIntro = "../assets/img/cascadaRioNoque.jpg";
    // if(this.plt.is('android') || this.plt.is('ios')){
    //     this.fotoIntro = "../www/assets/img/cascadaRioNoque.jpg";
    // }else{
    //     this.fotoIntro = "../assets/img/cascadaRioNoque.jpg";
    // }

}

 shouldShow(){
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
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            username: this.username,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.resultadoDelLogin = result;
            this.loading.dismiss();
            this.presentToast();
            this.localSaveCtrl.init();
            console.log('el usario desde la base datos tiene el rol de ',this.resultadoDelLogin.user.rol);
            if(this.resultadoDelLogin.user.rol === 'usuario'){
                this.menu.enable(false,'admin');
                this.menu.enable(true,'user');
            }else{
                this.menu.enable(true,'admin');
                this.menu.enable(false,'user');
            }
            this.navCtrl.setRoot(MisRegistrosPage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
 
    }
 
    crearCuenta(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
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
 
}