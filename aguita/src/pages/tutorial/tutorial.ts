import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login-page/login-page'; 
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { MisRegistrosPage } from '../mis-registros/mis-registros';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
 
  sliderOptions: any;
  tam: any;
  width: any;
  fotoIntro: any;
  foto1: any;
  foto2: any;
  foto3: any;
  foto4: any;
  foto5: any;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public plt: Platform) {
 
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
    
      if(this.plt.is('android') || this.plt.is('ios')){
          this.fotoIntro = "../www/assets/img/cascadaRioNoque.jpg";
      }else{
          this.fotoIntro = "../assets/img/cascadaRioNoque.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.foto1 = "../www/assets/img/tutorial1.png";
      }else{
          this.foto1 = "../assets/img/tutorial1.png";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.foto2 = "../www/assets/img/tutorial2.png";
      }else{
          this.foto2 = "../assets/img/tutorial2.png";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.foto3 = "../www/assets/img/tutorial3.png";
      }else{
          this.foto3 = "../assets/img/tutorial3.png";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.foto4 = "../www/assets/img/tutorial4.png";
      }else{
          this.foto4 = "../assets/img/tutorial4.png";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.foto5 = "../www/assets/img/tutorial5.png";
      }else{
          this.foto5 = "../assets/img/tutorial5.png";
      }

    //  this.fotoIntro = "../assets/img/cascadaRioNoque.jpg";
    //  this.foto1 = "../assets/img/tutorial1.png";
    //  this.foto2 = "../assets/img/tutorial2.png";
    //  this.foto3 = "../assets/img/tutorial3.png";
    //  this.foto4 = "../assets/img/tutorial4.png";                    
    //  this.foto5 = "../assets/img/tutorial5.png";

  }

  navHome() {
      this.storage.get('token').then((token) => {
         if(token === ''){
                this.navCtrl.setRoot(LoginPage);
            }else{
                this.navCtrl.setRoot(MisRegistrosPage);
            }
        });
  }
 
  ionViewDidLoad() {
   // console.log('ionViewDidLoad IntroPage');
  }
 
}