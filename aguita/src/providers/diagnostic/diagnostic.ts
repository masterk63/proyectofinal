import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class DiagnosticProvider {

  constructor(public http: Http,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController,
    private geolocation: Geolocation) {

    // // hasta aqui... lo de abajo son otras cosas de control innecesarias
    // this.diagnostic.isLocationAvailable()
    //   .then(res => {
    //     console.log('isLocationAvailable -> res', res);
    //   })
    //   .catch(err => {
    //     console.log('isLocationAvailable -> err', err);
    //   })

    // this.diagnostic.isLocationAuthorized()
    //   .then(res => {
    //     console.log('isLocationAuthorized -> res', res);
    //   })
    //   .catch(err => {
    //     console.log('isLocationAuthorized -> err', err);
    //   })
    // this.diagnostic.getLocationAuthorizationStatus()
    //   .then(res => {
    //     console.log('getLocationAuthorizationStatus -> res', res);
    //   })
    //   .catch(err => {
    //     console.log('getLocationAuthorizationStatus -> err', err);
    //   })

    // this.diagnostic.getLocationMode()
    //   .then(res => {
    //     console.log('getLocationMode -> res', res);
    //   })
    //   .catch(err => {
    //     console.log('getLocationMode -> err', err);
    //   })

    // // SOLO PREGUNTA
    // this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.ACCESS_COARSE_LOCATION)
    //   .then(res => {
    //     console.log('getPermissionAuthorizationStatus -> res', res);
    //   })
    //   .catch(err => {
    //     console.log('getPermissionAuthorizationStatus -> err', err);
    //   })

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

  controlEnable() {
    return this.diagnostic.isLocationEnabled()
      .then(res => {
        console.log('isLocationEnabled -> res', res);
        if (!res) {
          console.log("yendo a settings a activar location... ")
          this.presentConfirm('Localizacion desactivada', 'Debe activar la localizacion para continuar', 'Ir a ajustes')
          setTimeout(
            this.controlAutorizacion()
              .then(() => {
                return Promise.resolve("ok")
              })
              .catch(() => {
                return Promise.reject("err")
              })
            , 6000);
        } else {
          this.controlAutorizacion()
            .then(() => {
              return Promise.resolve("ok")
            })
            .catch(() => {
              return Promise.reject("err")
            })
        }
      })
      .catch(err => {
        console.log('isLocationEnabled -> err', err);
        return Promise.reject("err")
      })
  }

  controlAutorizacion() {
    return this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.ACCESS_COARSE_LOCATION)
      .then(res => {
        //GRANTED para todo ok
        // DENIED todo mal
        console.log('getPermissionAuthorizationStatus -> res', res);
        if (res === "DENIED") {
          this.pedirPermiso()
            .then(() => { return Promise.resolve("ok") })
            .catch(() => { return Promise.reject("err") })
        } else if (res === "GRANTED") {
          return Promise.resolve("ok")
        }
      })
      .catch(err => {
        console.log('getPermissionAuthorizationStatus -> err', err);
        return Promise.reject("err")
      })
  }

  pedirPermiso() {
    return this.diagnostic.requestRuntimePermission(this.diagnostic.permission.ACCESS_COARSE_LOCATION)
      .then(res => {
        //GRANTED para todo ok
        // DENIED todo mal
        console.log('​DiagnosticProvider -> controlAutorizacion -> res', res);
        if (res === "GRANTED") {
          return Promise.resolve("ok")
        } else {
          return Promise.reject("err")
        }
      })
      .catch(err => {
        return Promise.reject("err")
      })

  }

}
