import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
      this.http.get('http://rickybruno.sytes.net:3000/api/registrosListar')
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
      this.http.get('http://rickybruno.sytes.net:3000/api/registroDame/' + idRegistro)
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
      this.http.get('http://rickybruno.sytes.net:3000/api/registroValidar/' + idRegistro)
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
      this.http.get('http://rickybruno.sytes.net:3000/api/registroInvalidar/' + idRegistro)
        .map(res => res.json())
        .subscribe(resultado => {
          this.mensajeInvalidar = resultado;
          resolve(this.mensajeInvalidar);
        }, error => reject("Error de conexion")
        );
    });
  }

}