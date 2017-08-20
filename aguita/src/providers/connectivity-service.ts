import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
 
declare var Connection;
declare var navigator: any;

@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    if(this.onDevice && (navigator.connection.type !== Connection.NONE)){
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && (navigator.connection.type !== Connection.NONE)){
      return (navigator.connection.type !== Connection.NONE) === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }
}