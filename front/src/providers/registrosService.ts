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

//   filterItems(searchTerm,filtro){

//       if(this.registros){
//           console.log("ya estan los registros cargados");
//          return this.registros.filter((atributo) => {
//                switch(filtro) {
//                     case "nombre":
//                         return atributo.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                     case "apellido":
//                         return atributo.apellido.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                     case "usuario":
//                         return atributo.usuario.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                     case "mail":
//                         return atributo.mail.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                 }
//         });
//       }
//        this.load().then(()=>function (){
//               return this.usuarios.filter((atributo) => {
//                     switch(filtro) {
//                             case "nombre":
//                                 return atributo.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                             case "apellido":
//                                 return atributo.apellido.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                             case "usuario":
//                                 return atributo.usuario.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                             case "mail":
//                                 return atributo.mail.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//                         }
//         });
//        });
//     }

    // cargarRegistros() {
    //   return new Promise(resolve => {
    //       console.log("registros no cargados, comunicando provider");
    //     this.http.get('http://rickybruno.sytes.net:3000/api/usuariosListar')
    //       .subscribe(resultado => {
    //         this.usuarios = resultado;
    //         this.usuarios = JSON.parse(this.usuarios._body);
    //         resolve(this.usuarios);
    //       });
    //   });
    // }

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