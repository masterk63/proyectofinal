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
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import UsuarioModelo from '../../modelos/usuario';
import { LocalSqlProvider } from '../../providers/local-sql/local-sql';

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
  FB_APP_ID: number = 164639320988358;
  respuestaGoogle: any;
  titulo = 'Aguita'

  constructor(public navCtrl: NavController,
    public plt: Platform,
    public authService: Auth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public localSaveCtrl: Localsave,
    public fb: Facebook,
    private authServiceFacebook: AuthService,
    public socketPrv: SocketProvider,
    private menu: MenuController,
    public storage: Storage,
    private toastCtrl: ToastController,
    private localSQL: LocalSqlProvider,
  ) {

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

    this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }

  ngOnInit() {

  }

  sincronizar(refresher) {
    console.log('Begin async operation', refresher);
    this.localSQL.sincronizarDB()
      .then(res => {
        refresher.complete();
        // this.localSQL.listarUsuarios().then(res => console.log("usuarios", res))
        this.presentToast('Usuarios sincronizados correctamente');
      })
      .catch(err => {
        this.mostrarAlerta("Error", "No se pudo sincronizar la lista de usuarios. Verifique su conexion a internet")
        refresher.cancel();
      })
  }

  loginFacebook() {
    if (this.plt.is('cordova')) {
      this.fbLoginNative();
    } else {
      this.fbLoginWeb();
    }
  }

  fbLoginWeb(): void {
    this.authServiceFacebook.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      if (user) {
        this.fbLoginStore(user);
      }
    });
  }

  async fbLoginStore(user) {
    this.showLoader();
    let usuario = new UsuarioModelo();
    usuario.apellido = user.lastName;
    usuario.nombre = user.firstName;
    usuario.mail = user.email;
    usuario.fotoPerfil = (await this.imgURLtoBase64(user.photoUrl)).toString().split(",")[1];
    usuario.password = user.id;
    this.authService.fbLogin(usuario)
      .then((res: any) => {
        return this.localSQL.sincronizarDB()
        this.socketPrv.init(res.user.idUsuario);
      })
      .then(() => {
        this.loading.dismiss();
        this.presentToast('Ha iniciado sesion de manera correcta');
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(e => {
        this.loading.dismiss();
        this.mostrarAlerta('Error: ', e)
      });
  }

  fbLoginNative() {
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
      .then((response) => {
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,email,last_name,first_name", params)
          .then((user) => {
            user.pic = "https://graph.facebook.com/" + userId + "/picture?type=normal";
            let usuario = {
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              photoUrl: user.pic,
              id: user.id
            }
            if (user.email) {
              this.fbLoginStore(usuario);
            } else {
              throw "No se pudo obtner un mail de Facebook."
            }
          }).catch(e => {
            this.mostrarAlerta('Error', e)
          })
      }, (error) => {
        if (error.errorCode != 4201) {
          let e = JSON.stringify(error)
          this.mostrarAlerta('Error', e)
        }
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

    this.localSQL.login(credentials)
      .then((result: any) => {
        console.log("debtro del then en login", result)
        this.loading.dismiss();
        this.presentToast('Ha iniciado sesion de manera correcta');
        this.socketPrv.init(result.idUsuario);
        this.navCtrl.setRoot(TabsPage);
      })
      .catch((err) => {
        console.log("debtro del err en login")
        this.loading.dismiss();
        this.mostrarAlerta('Error', err.mensaje)
        console.log(err);
      });
  }

  crearCuenta() {
    this.navCtrl.push(SignupPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  async imgURLtoBase64(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = () => {
        let reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Inciando sesión...'
    });
    this.loading.present();
  }

  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
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