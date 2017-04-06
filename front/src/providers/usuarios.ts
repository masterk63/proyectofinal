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

  data: any;

  constructor(private http: Http) {
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
      this.http.get('http://rickybruno.sytes.net:5984/passport-test/_design/usuarios/_view/listar')
        .subscribe(resultado => {
          this.data = resultado;
          this.data = JSON.parse(this.data._body).rows;
          resolve(this.data);
        });
    });
  }
}