import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as configServer from './../server';

@Injectable()
export class RegistrosService {
  //lista de usuarios para gestion
  public registros: any;
  //solo el usuario para el DAME
  public registro: any;
  mensajeModificar: any;
  mensajeValidar: any;
  mensajeInvalidar: any;

  constructor(private http: HttpClient) {

  }


  cargarRegistros() {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registrosListar').timeout(5000)
        .subscribe(resultado => {
          this.registros = resultado;
          resolve(this.registros);
        }, error => reject("Error de conexion")
        );
    });
  }

  cargarRegistrosUsuario(idRegistro) {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registrosListarUsuario/' + idRegistro).timeout(5000)
        .subscribe(resultado => {
          this.registros = resultado;
          resolve(this.registros);
        }, error => reject("Error de conexion")
        );
    });
  }

  registroDame(idRegistro) {
    return new Promise((resolve, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/registroDame/' + idRegistro)
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
        .subscribe(resultado => {
          this.mensajeInvalidar = resultado;
          resolve(this.mensajeInvalidar);
        }, error => reject("Error de conexion")
        );
    });
  }

  async crearRegistro(registroCompleto) {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      let reg = {
        registro: registroCompleto
      }
      this.http.post
      this.http.post(`${configServer.data.urlServidor}/api/registroNuevo`, JSON.stringify(reg), { headers: headers, reportProgress: true })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}