import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Usuarios provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuariosService {
    //lista de usuarios para gestion
    public usuarios: any;
    //solo el usuario para el DAME
    usuario: any;
    mensajeModificar: any;
    mensajeBaja: any;

    constructor(private http: Http) {

    }

    filterItems(searchTerm, filtro) {

        if (this.usuarios) {
            console.log("ya estan los usuarios cargados");
            return this.usuarios.filter((atributo) => {
                switch (filtro) {
                    case "nombre":
                        return atributo.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    case "apellido":
                        return atributo.apellido.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    case "usuario":
                        return atributo.usuario.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    case "mail":
                        return atributo.mail.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                }
            });
        }
        this.load().then(() => function () {
            return this.usuarios.filter((atributo) => {
                switch (filtro) {
                    case "nombre":
                        return atributo.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    case "apellido":
                        return atributo.apellido.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    case "usuario":
                        return atributo.usuario.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    case "mail":
                        return atributo.mail.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                }
            });
        });
    }

    load() {
        return new Promise((resolve, reject) => {
            console.log("usuarios no cargados, comunicando provider");
            this.http.get('http://rickybruno.sytes.net:3000/api/usuariosListar')
                .subscribe(resultado => {
                    this.usuarios = resultado;
                    this.usuarios = JSON.parse(this.usuarios._body);
                    resolve(this.usuarios);
                }, error => reject("Error de conexion")
                );
        });
    }

    usuarioDame(idUsuario) {
        return new Promise((resolve, reject) => {
            this.http.get('http://rickybruno.sytes.net:3000/api/usuarioDame/' + idUsuario)
                .map(res => res.json())
                .subscribe(resultado => {
                    this.usuario = resultado;
                    resolve(this.usuario);
                }, error => reject("Error de conexion")
                );
        });
    }

    usuarioModificar(usuario) {
        return new Promise((resolve, reject) => {
            this.http.post('http://rickybruno.sytes.net:3000/api/usuarioModificar', usuario)
                .map(res => res.json())
                .subscribe(resultado => {
                    this.mensajeModificar = resultado;
                    resolve(this.mensajeModificar);
                }, error => reject("Error de conexion")
                );
        });
    }

    usuarioBaja(idUsuario) {
        return new Promise((resolve, reject) => {
            this.http.get('http://rickybruno.sytes.net:3000/api/usuarioBaja/' + idUsuario)
                .map(res => res.json())
                .subscribe(resultado => {
                    this.mensajeBaja = resultado;
                    resolve(this.mensajeBaja);
                }, error => reject("Error de conexion")
                );
        });
    }


}