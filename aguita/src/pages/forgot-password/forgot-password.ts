import { Component } from '@angular/core';
import { Platform, NavController, LoadingController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  //form Validators
  registroForm: FormGroup;
  submitAttempt: boolean = false;

  loading: any;
  sliderOptions: any;
  tam: any;
  width: any;
  fotoIntro: any;
  verPass = "password";
  tituloBoton = "Mostrar contraseña";
  isActive = false;

  constructor(public navCtrl: NavController,
    public plt: Platform,
    public authService: Auth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {

    this.registroForm = formBuilder.group({
      mail: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+.com+$'),
        Validators.required])],
    });

    //Imagen deacuerdo al ancho de la pantalla
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
    this.fotoIntro = "../assets/img/cascadaRioNoque.jpg";
    // if(this.plt.is('android') || this.plt.is('ios')){
    //     this.fotoIntro = "../www/assets/img/cascadaRioNoque.jpg";
    // }else{
    //     this.fotoIntro = "../assets/img/cascadaRioNoque.jpg";
    // }
  }

  forgotPassword() {
    if (!this.registroForm.valid) {
      this.submitAttempt = true;
      this.mostrarAlerta('Advertencia','Por favor complete todos los campos.')
    } else {
      this.showLoader();
      let details = {
        email: this.registroForm.value.mail,
      };
      this.authService.forgotPassword(details).then((result:any) => {
        this.loading.dismiss();
        console.log(result);
        this.mostrarAlerta('Atencion',result.mensaje)
        this.navCtrl.pop();
      }, (err) => {
        this.mostrarAlerta('Error',err)
        this.loading.dismiss();
      });
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });
    this.loading.present();
  }

  mostrarAlerta(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  volver() {
    this.navCtrl.pop();
  }

}