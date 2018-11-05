import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as configServer from './../../server'
import { Events } from 'ionic-angular';

@Injectable()
export class SocketProvider {

  public socket: any
  public idUsuario: any;

  constructor(public events: Events, ) {

  }

  public init(idUsuario) {
    this.idUsuario = idUsuario;
    // IMPORTANTEEEEEEEEEEEEEEEEEEEEEEEEEEEEE para el servidor
    // this.socket = io(configServer.data.urlServidor,{
    //   path: '/aguita/socket.io'
    // });
    this.socket = io(configServer.data.urlServidor);
    this.socket.on('handShake', (msg) => {
      this.socket.emit('crearRoom', { user: idUsuario });
    });

    this.socket.on('mensaje', (reg) => {
      this.events.publish('registro:creado', reg);
    });
  }

  public publicar(reg) {
    this.socket.emit('enviarInfo', { user: this.idUsuario, registro: reg });
  }

  public getSocket() {
    return this.socket;
  }

}
