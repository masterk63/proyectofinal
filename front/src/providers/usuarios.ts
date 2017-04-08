import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Usuarios provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Usuarios {

  usuarios: any;

  constructor(private http: Http) {

  }

  filterItems(searchTerm){

    console.log(searchTerm);

      if(this.usuarios){
         return this.usuarios.filter((item) => {
            return item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
      }
       this.load().then(()=>function (){
              return this.usuarios.filter((item) => {
            return item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
       });
    }

    load() {
      // if (this.data) {
      //   console.log("ya tiene los datos de usuarios");
      //   console.log(this.data);
      //   // ya tiene los datos
      //   return Promise.resolve(this.data);
      // }

      // todavia no tiene los datos de usuarios
      return new Promise(resolve => {
        this.http.get('http://rickybruno.sytes.net:3000/api/usuariosListar')
          .subscribe(resultado => {
            this.usuarios = resultado;
            this.usuarios = JSON.parse(this.usuarios._body);
            resolve(this.usuarios);
          });
      });
    }
}