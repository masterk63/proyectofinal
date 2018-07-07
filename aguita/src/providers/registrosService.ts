import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as configServer from './../server';
import { Events } from 'ionic-angular';

@Injectable()
export class RegistrosService {
  //lista de usuarios para gestion
  public registros: any;
  //solo el usuario para el DAME
  public registro: any;
  mensajeModificar: any;
  mensajeValidar: any;
  mensajeInvalidar: any;

  constructor(private http: HttpClient,public events: Events,) {

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
    return new Promise<Array<any>>((resolve, reject) => {
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
    this.events.publish('uploadProcessSize', { indice: 0, total: 100 });    
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      let reg = {
        registro: registroCompleto
      }

      const req = new HttpRequest('POST',
        `${configServer.data.urlServidor}/api/registroNuevo`,
        reg,
        { headers: headers, reportProgress: true });

      this.http.request(req)
        .subscribe(
          event => {

            if (event.type === HttpEventType.DownloadProgress) {
              console.log("Download progress event", event);
            }

            if (event.type === HttpEventType.UploadProgress) {
              console.log("Upload progress event", event);
              this.events.publish('uploadProcessSize', { indice: event.loaded, total: event.total });
            }
            
            if (event.type === HttpEventType.Response) {
              resolve(event.body);
            }
          }
          , (err) => {
            reject(err);
          });
    });
  }

}