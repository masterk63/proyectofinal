import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform} from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as configServer from './../server'

@Injectable()
export class Auth {

  public token: any;

  constructor(public http: Http,
    public storage: Storage,
    public plt: Platform
  ) { }

  //verifica con el token si el usuario existe en la base de dato
  checkAuthentication() {
    return new Promise((resolve, reject) => {
      //Load token if exists
      this.storage.get('token').then((value) => {
        this.token = value;
        
        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get(configServer.data.urlServidor +'/api/auth/protected', { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

      });

    });

  }

  createAccount(details) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(configServer.data.urlServidor +'/api/auth/register', JSON.stringify(details), { headers: headers })
        .subscribe(res => {
          let data = res.json();
          if (data.codigo > 0) {
            console.log(data.token);
            this.token = data.token;
            this.storage.set('token', data.token);
            this.storage.set('idUsuario', data.user.idUsuario);
            this.storage.set('rol', data.user.rol);
          }
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(credentials) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(configServer.data.urlServidor + '/api/auth/login', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
            let data = res.json();
            console.log('datos de usuario',data)
            this.token = data.token;
            this.storage.set('token', data.token);
            this.storage.set('idUsuario', data.user.idUsuario);
            this.storage.set('rol', data.user.rol);
            resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }

  forgotPassword(credentials) {

    return new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(configServer.data.urlServidor + '/api/forgot', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
            let data = res.json();
            resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }

  logout() {
    return new Promise((resolve, reject) => {
      this.storage.set('token', '');
      this.storage.set('idUsuario', '');
      this.storage.set('rol', '');
      resolve(42)
    });
  }

}