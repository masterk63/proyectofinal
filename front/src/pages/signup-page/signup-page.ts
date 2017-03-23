import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  loading:any;
  sliderOptions: any;
  tam: any;
  width: any;
  fotoIntro: any;
  verPass = "password";
  tituloBoton = "Mostrar contraseña";
  isActive=false;

  constructor(public navCtrl: NavController, public plt: Platform, public authService: Auth, public loadingCtrl: LoadingController) {
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
 
  register(){
 
    this.showLoader();
 


    let details = {
        username: this.email,
        password: this.password,
        role: this.role
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }

      volver(){
        this.navCtrl.pop();
    }

    verPassword(){
      this.isActive = !this.isActive;
      if(this.verPass === "text"){
        this.verPass = "password"
        this.tituloBoton="Mostrar contraseña";
      }else{
        this.verPass = "text"
        this.tituloBoton="Ocultar contraseña";
      }
    }
 
}