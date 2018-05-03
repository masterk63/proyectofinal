import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as configServer from './../server';
import Usuario from '../models/usuario'

@Injectable()
export class UsuariosService {
  //lista de usuarios para gestion
  public usuarios: any;
  //solo el usuario para el DAME
  usuario: any;
  mensajeModificar: any;
  mensajeBaja: any;

  constructor(private http: Http) {}

  cargarUsuarios(estado) {
    return new Promise<Array<Usuario>>((resolve, reject) => {
      console.log("usuarios no cargados, comunicando provider");
      this.http.post(configServer.data.urlServidor + '/api/usuariosListar', estado)
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
      this.http.get(configServer.data.urlServidor + '/api/usuarioDame/' + idUsuario)
        .map(res => res.json())
        .subscribe(resultado => {
          this.usuario = resultado;
          resolve(this.usuario);
        }, error => reject("Error de conexion")
        );
    });
  }

  actilizarFotoPerfil(usuario){
    return new Promise((resolve,reject)=>{
      this.http.post(configServer.data.urlServidor + '/api/usuarioActualizarFotoPerfil', usuario)
      .map(res => res.json())
      .subscribe(resultado => {
        let res = resultado[0];
        if(res.codigo > 0){
          resolve(res);
        }else{
          reject("Se ah producido un error.");
        }
      }, error => reject("Error de conexion")
      );
    });
  }

  usuarioModificar(usuario) {
    return new Promise((resolve, reject) => {
      this.http.post(configServer.data.urlServidor + '/api/usuarioModificar', usuario)
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
      this.http.get(configServer.data.urlServidor + '/api/usuarioBaja/' + idUsuario)
        .map(res => res.json())
        .subscribe(resultado => {
          this.mensajeBaja = resultado;
          resolve(this.mensajeBaja);
        }, error => reject("Error de conexion")
        );
    });
  }


}