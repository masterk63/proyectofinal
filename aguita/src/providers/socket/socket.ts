import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as configServer from './../../server'
import { Events } from 'ionic-angular';

@Injectable()
export class SocketProvider {

  public socket:any
  public token:any;

  constructor(public events: Events,) {
  
  }

  public init(token){
    this.token = token;

    this.socket = io(configServer.data.urlServidor);

    this.socket.on('handShake', (msg) => {
      this.socket.emit('crearRoom', { user:token });
    });

    this.socket.on('mensaje', (reg) => {
      console.log('recibe un mensaje',reg)
      this.events.publish('registro:creado', reg);
    });
  }

  public publicar(reg){
    this.socket.emit('enviarInfo', { user:this.token, registro:reg});
  }

  public getSocket(){
    return this.socket;
  }

}
