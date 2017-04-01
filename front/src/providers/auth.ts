import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Localsave } from '../providers/localsave';

@Injectable()
export class Auth {
 
  public token: any;
 
  constructor(public http: Http, 
              public storage: Storage,
              public localSaveCtrl:Localsave) {}
 
  //verifica con el token si el usuario existe en la base de datos
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('http://rickybruno.sytes.net:3000/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
 
        });         
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://rickybruno.sytes.net:3000/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            if(data.codigo > 0){
              console.log(data.token);
              this.token = data.token;
              this.storage.set('token', data.token);
              this.storage.set('idUsuario', data.user._id);
            }
            resolve(data);
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://rickybruno.sytes.net:3000/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            this.storage.set('idUsuario', data.user._id);
            resolve(data);
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    return new Promise((resolve, reject) => {
      this.storage.set('token', '');
      this.storage.set('idUsuario', '');
      this.localSaveCtrl.destruirDB();
            resolve(42);
    });
  }
 
}