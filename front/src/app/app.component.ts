import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MapasjsPage } from '../pages/mapasjs/mapasjs';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { HomePage } from '../pages/home/home';
import { ClouDOPage } from '../pages/clou-do/clou-do';
import { Mapajshtml } from '../pages/mapajshtml/mapajshtml';
import { SignupPage } from '../pages/signup-page/signup-page';
import { MisRegistrosPage } from '../pages/mis-registros/mis-registros';
import { LoginPage } from '../pages/login-page/login-page';
import { IntroPage } from '../pages/intro/intro';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { Storage } from '@ionic/storage';
import { Auth } from '../providers/auth';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = LoginPage;//aqui poner la pagina de LOGIN como root
  rootPage: any;
  pagesAdmin: Array<{title: string, component: any}>;
  pagesUser: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public storage: Storage,public authService: Auth,private menu: MenuController) {
    this.menu.enable(false);
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pagesAdmin = [
      { title: 'Administrar', component: ClouDOPage },
      { title: 'Mis Registros', component: MisRegistrosPage },
      { title: 'Nuevo Registro', component: HomePage },
      { title: 'Registrarse', component: SignupPage },
      { title: 'LoginPage', component: LoginPage },
      { title: 'Introduccion', component: IntroPage },
      { title: 'Tutorial', component: TutorialPage },
      // { title: 'Mapas JS', component: MapasjsPage },
      // { title: 'Mapas Nativo', component: MapasnativoPage },
      // { title: 'Camara', component: HomePage },
      // { title: 'ClouDO', component: ClouDOPage },
      // { title: 'MapaHTML', component: Mapajshtml },
      // { title: 'SignupPage', component: SignupPage },
      // { title: 'LoginPage', component: LoginPage },
      // { title: 'MisRegistros', component: MisRegistrosPage },
      // { title: 'Introduccion', component: IntroPage },
      // { title: 'Tutorial', component: TutorialPage },
    ];

    this.pagesUser = [
      { title: 'Mis Registros', component: MisRegistrosPage },
      { title: 'Nuevo Registro', component: HomePage },
      { title: 'Registrarse', component: SignupPage },
      { title: 'LoginPage', component: LoginPage },
      { title: 'Introduccion', component: IntroPage },
      { title: 'Tutorial', component: TutorialPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
       // Or to get a key/value pair
      this.storage.get('token').then((token) => {
         console.log('token is', token);
         if(token === ''){
           this.rootPage = LoginPage;
         }else{
           this.storage.get('rol').then((rol) => {
             console.log('el usario tiene el rol de',rol);
              if(rol === 'usuario'){
                this.menu.enable(false,'admin');
                this.menu.enable(true,'user');
              }else{
                  this.menu.enable(true,'admin');
                  this.menu.enable(false,'user');
              }
              this.rootPage = MisRegistrosPage;
           });
         }
       }).catch((err)=>{ 
            console.log(err);
       });
     });
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
