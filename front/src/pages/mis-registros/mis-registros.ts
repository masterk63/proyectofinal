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
                  try{
                    this._zone.run(() => this.registros = data);
                    console.log(this.registros);
                  }catch(e){
                    console.log('no hay registros');
                  }
                });
              }

  ionViewDidLoad() {
    
  }

  logout(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
