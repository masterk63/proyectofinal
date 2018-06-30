import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';

@Injectable()
export class DiagnosticProvider {

  constructor(public http: Http,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController) {
  }

  presentConfirm(titulo, mensaje, botonIr) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: botonIr,
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    alert.present();
  }

  async controlPermisos() {
    let enabled = await this.isLocationEnabled();
    if (!enabled) {
      this.presentConfirm('Localizacion desactivada', 'Debe activar la localizacion para continuar', 'Ir a ajustes')
      return Promise.reject("err");
    } else {
      let authorized = await this.isLocationAuthorized();
      if (!authorized) {
        let deny = await this.requestLocationAuthorization();
        if (deny === "DENIED") {
          this.presentConfirm('Permiso de ubicacion', 'Debe permitir a la aplicacion usar el servicio de localizacion', 'Ir a ajustes')
          return Promise.reject("err");
        } else {
          return Promise.reject("err");
        }
      } else {
        return Promise.resolve("ok");
      }
    }
  }

  isLocationEnabled() {
    return this.diagnostic.isLocationEnabled()
      .then((state) => {
        return Promise.resolve(state);
      }).catch(e => {
        return Promise.reject(e);
      });

  }

  isLocationAuthorized() {
    return this.diagnostic.isLocationAuthorized()
      .then((state) => {
        return Promise.resolve(state);
      }).catch(e => {
        return Promise.reject(e);
      });
  }

  getLocationAuthorizationStatus() {
    this.diagnostic.getLocationAuthorizationStatus()
      .then((state) => {
        console.log('getLocationAuthorizationStatus')

        console.log(state);
      }).catch(e => console.error(e));

  }

  requestLocationAuthorization() {
    console.log("hola")
    return this.diagnostic.requestLocationAuthorization()
      .then((state) => {
        console.log('​DiagnosticProvider -> requestLocationAuthorization -> state', state);
        return Promise.resolve(state);
      }).catch(e => {
        return Promise.reject(e);
      });
  }

}
