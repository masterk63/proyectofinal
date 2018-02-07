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
import { SocketProvider } from '../../providers/socket/socket';
import { MenuController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';



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
  FB_APP_ID: number = 164639320988358;
  respuestaGoogle: any;
  

  constructor(public navCtrl: NavController,
    public plt: Platform,
    public authService: Auth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public localSaveCtrl: Localsave,
    public fb: Facebook,
    private googlePlus: GooglePlus,
    public socketPrv: SocketProvider,
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

    this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin() {
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
      .then(function (response) {
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,gender", params)
          .then(function (user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

            let usuario = {
              name: user.name,
              gender: user.gender,
              picture: user.picture
            }

            console.log(usuario);
            //now we have the users info, let's save it in the NativeStorage
            // env.nativeStorage.setItem('user',
            //   {
            //     name: user.name,
            //     gender: user.gender,
            //     picture: user.picture
            //   })
            //   .then(function () {
            //     nav.push(UserPage);
            //   }, function (error) {
            //     console.log(error);
            //   })
          })
      }, function (error) {
        console.log(error);
      });
  }

  doGoogleLogin(){
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '166102314443-8d6u9cfthhbe76a9mpdb458ltegea2n0.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then((user) => {
      loading.dismiss();
      let user2 = {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      }
      this.respuestaGoogle = JSON.stringify(user2);
      console.log(this.respuestaGoogle);
      // env.nativeStorage.setItem('user', {
      //   name: user.displayName,
      //   email: user.email,
      //   picture: user.imageUrl
      // })
      // .then(function(){
      //   nav.push(UserPage);
      // }, function (error) {
      //   console.log(error);
      // })
    }).catch((error) => {
      this.respuestaGoogle = error;
      console.log(this.respuestaGoogle)
      loading.dismiss();
    });
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
      this.socketPrv.init(this.resultadoDelLogin.user.idUsuario);
      this.navCtrl.setRoot(TabsPage);
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