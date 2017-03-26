import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Localsave } from '../../providers/localsave';
import {File, Transfer, FilePath } from 'ionic-native';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

@Component({
  selector: 'page-mis-registros',
  templateUrl: 'mis-registros.html'
})
export class MisRegistrosPage {

  registros:any;

  constructor(public navCtrl: NavController, 
              public authService: Auth,
              public navParams: NavParams,
              public localSaveCtrl:Localsave,
              private _zone: NgZone) {
                this.localSaveCtrl.getTodos().subscribe((data) => {
                    this._zone.run(() => this.registros = data);
                    console.log(this.registros);
                });
              }

  ionViewDidLoad() {
    
  }

  logout(){
    console.log('saliendo logout');
    this.authService.logout().then(()=>{
      console.log('listo borrado, dirijiendo a registrar');
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
