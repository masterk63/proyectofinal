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
  registro: any;
  mensajeModificar: any;
  mensajeBaja: any;

  constructor(private http: Http) {

  }


    cargarRegistros() {
      return new Promise(resolve => {
          console.log("registros no cargados, comunicando provider");
        this.http.get('http://rickybruno.sytes.net:3000/api/registrosListar')
          .subscribe(resultado => {
            this.registros = resultado;
            this.registros = JSON.parse(this.registros._body);
            resolve(this.registros);
          });
      });
    }

    registroDame(idRegistro){
        return new Promise(resolve => {
        this.http.get('http://rickybruno.sytes.net:3000/api/registroDame/'+idRegistro)
            .map(res => res.json())
            .subscribe(resultado => {
            this.registro = resultado;
            resolve(this.registro);
          });
      });
    }

    // usuarioModificar(usuario){
    //     return new Promise(resolve => {
    //     this.http.post('http://rickybruno.sytes.net:3000/api/usuarioModificar',usuario)
    //         .map(res => res.json())
    //         .subscribe(resultado => {
    //         this.mensajeModificar = resultado;
    //         resolve(this.mensajeModificar);
    //       });
    //   });
    // }

    // usuarioBaja(idUsuario){
    //     return new Promise(resolve => {
    //     this.http.get('http://rickybruno.sytes.net:3000/api/usuarioBaja/'+idUsuario)
    //         .map(res => res.json())
    //         .subscribe(resultado => {
    //         this.mensajeBaja = resultado;
    //         resolve(this.mensajeBaja);
    //       });
    //   });
    // }


}