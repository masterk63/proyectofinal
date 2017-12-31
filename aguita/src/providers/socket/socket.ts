import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as configServer from './../../server'

@Injectable()
export class SocketProvider {

  socket:any
  
  constructor() {
  
  }

  public init(token){
    this.socket = io(configServer.data.urlServidor);

    this.socket.on('handShake', (msg) => {
      this.socket.emit('crearRoom', { user:token });
    });

    
  }

}
