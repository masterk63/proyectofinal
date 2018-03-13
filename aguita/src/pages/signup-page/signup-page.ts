import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { Localsave } from '../../providers/localsave';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {

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
  urlImg: string;

  constructor(public navCtrl: NavController,
    public plt: Platform,
    public authService: Auth,
    public localSaveCtrl: Localsave,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {

    //FORM BUILDER

    this.registroForm = formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.required])],
      apellido: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.required])],
      residencia: ['', Validators.compose([
        Validators.maxLength(100)])],
      institucion: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.required])],
      grado: ['', Validators.compose([
        Validators.maxLength(50)])],
      mail: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+.com+$'),
        Validators.required])],
      username: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(5),
        Validators.required])],
      password: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(5),
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
    
    if (this.plt.is('cordova')) {
      this.urlImg = '../www/'
    } else {
      this.urlImg = '../'
    }
    this.fotoIntro = this.urlImg + "assets/img/cascadaRioNoque.jpg";
  }

  register() {
    if (!this.registroForm.valid) {
      this.submitAttempt = true;
    } else {
      console.log(this.registroForm.value.nombre);
      this.showLoader();
      let details = {
        mail: this.registroForm.value.mail,
        username: this.registroForm.value.username,
        password: this.registroForm.value.password,
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        institucion: this.registroForm.value.institucion,
        grado: this.registroForm.value.grado,
        residencia: this.registroForm.value.residencia
      };
      
      this.authService.createAccount(details).then((result) => {
        this.loading.dismiss();
        this.localSaveCtrl.init();
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        this.loading.dismiss();
      });
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Registrando...'
    });

    this.loading.present();
  }

  volver() {
    this.navCtrl.pop();
  }

  verPassword() {
    this.isActive = !this.isActive;
    if (this.verPass === "text") {
      this.verPass = "password"
      this.tituloBoton = "Mostrar contraseña";
    } else {
      this.verPass = "text"
      this.tituloBoton = "Ocultar contraseña";
    }
  }

}