import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Localsave } from '../../providers/localsave';
import {File, Transfer, FilePath } from 'ionic-native';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { RegistroPage } from '../registro/registro';
import { MenuController,Platform } from 'ionic-angular';


@Component({
  selector: 'page-mis-registros',
  templateUrl: 'mis-registros.html'
})
export class MisRegistrosPage {

  registros:any;
  fotoMapaNoDisponible:any;

  constructor(public navCtrl: NavController, 
              public authService: Auth,
              public navParams: NavParams,
              public localSaveCtrl:Localsave,
              public platform: Platform, 
              private menu: MenuController,
              private _zone: NgZone) {
                this.localSaveCtrl.getTodos().subscribe((data) => {
                    this._zone.run(() => this.registros = data);
                    console.log(this.registros);
                });


                if(this.platform.is('android') || this.platform.is('ios')){
                    this.fotoMapaNoDisponible = "../www/assets/img/mapNotAvalible.jpg";
                }else{
                    this.fotoMapaNoDisponible = "../assets/img/mapNotAvalible.jpg";
                }
              }

  ionViewDidLoad() {
    
  }

  controlarFotoMapa(reg){
      if(Object.keys(reg._attachments).length > 2){
        return true;
      }
      else{
        return false;
      }
  }
  
  logout(){
    console.log('saliendo logout');
    this.authService.logout().then(()=>{
      console.log('listo borrado, dirijiendo a registrar');
      
      this.navCtrl.setRoot(LoginPage);
    });
  }

  verRegistro(attachments,fecha,ciudad,provincia,pais,latitud,longitud,indice,elmido,patudo,plecoptero,tricoptero,observacion){
    console.log(fecha);
    this.navCtrl.push(RegistroPage,{donde : "mis registros",
                                    attachments,
                                    fecha,
                                    ciudad,
                                    provincia,
                                    pais,
                                    latitud,
                                    longitud,
                                    indice,
                                    elmido,
                                    patudo,
                                    plecoptero,
                                    tricoptero,
                                    observacion
                                    });
  }

  

}
