import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login-page/login-page'; 
import { HomePage } from '../home/home'; 
 
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
 
  sliderOptions: any;
 
  constructor(public navCtrl: NavController) {
 
    this.sliderOptions = {
      pager: true
    };
 
  }

  navHome() {
    this.navCtrl.setRoot(HomePage);
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
 
}