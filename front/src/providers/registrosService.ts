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
    //   this.registros.sort(function(a,b) { //La funcion sort ordena numeros, si quiero de menor a mayor a es 'a-b', si quiero de mayo a menor b-a
    //         return b.indice - a.indice;
    //     });
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

    // usuarioDame(idUsuario){
    //     return new Promise(resolve => {
    //     this.http.get('http://rickybruno.sytes.net:3000/api/usuarioDame/'+idUsuario)
    //         .map(res => res.json())
    //         .subscribe(resultado => {
    //         this.usuario = resultado;
    //         resolve(this.usuario);
    //       });
    //   });
    // }

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