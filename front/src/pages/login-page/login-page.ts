import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
 
@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
 
    email: string;
    password: string;
    loading: any;
 
    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public storage: Storage) {
 
    }
 
    ionViewDidLoad() {
        //descomentar para pagina introductoria
            // this.storage.get('intro-donea').then(done => {
            // if (!done) {
            // this.storage.set('intro-donea', true);
            // this.navCtrl.setRoot(IntroPage);
            // }
            // });
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            username: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}