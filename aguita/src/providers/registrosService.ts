import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as configServer from './../server';

/*
  Generated class for the RegistrosService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RegistrosService {
  //lista de usuarios para gestion
  public registros: any;
  //solo el usuario para el DAME
  public registro: any;
  mensajeModificar: any;
  mensajeValidar: any;
  mensajeInvalidar: any;

  constructor(private http: Http) {

  }

  
  cargarRegistros() {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registrosListar')
        .subscribe(resultado => {
          this.registros = resultado;
          this.registros = JSON.parse(this.registros._body);
          resolve(this.registros);
        }, error => reject("Error de conexion")
        );
    });
  }

  registroDame(idRegistro) {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registroDame/' + idRegistro)
        .map(res => res.json())
        .subscribe(resultado => {
          this.registro = resultado;
          resolve(this.registro);
        }, error => reject("Error de conexion")
        );
    });
  }

  registroValidar(idRegistro) {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registroValidar/' + idRegistro)
        .map(res => res.json())
        .subscribe(resultado => {
          this.mensajeValidar = resultado;
          resolve(this.mensajeValidar);
        }, error => reject("Error de conexion")
        );
    });
  }

  registroInvalidar(idRegistro) {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registroInvalidar/' + idRegistro)
        .map(res => res.json())
        .subscribe(resultado => {
          this.mensajeInvalidar = resultado;
          resolve(this.mensajeInvalidar);
        }, error => reject("Error de conexion")
        );
    });
  }

  crearRegistro(registroCompleto) {
    
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let reg = {
        registro:registroCompleto
      }

      this.http.post(`${configServer.data.urlServidor}/api/registroNuevo`, JSON.stringify(reg), { headers: headers })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}