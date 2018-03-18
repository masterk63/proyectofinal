import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { LocalSqlProvider } from './local-sql/local-sql';
import { RegistrosService } from './registrosService';

@Injectable()
export class ConnectivityService {

  constructor(private network: Network,
              public regSrv:RegistrosService,
              public localSQLPrv:LocalSqlProvider) {
    
    console.log('en el network provider');

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
          this.subir();
        }
      }, 3000);
    });

  }

  isOnline(): boolean {
      return navigator.onLine;
  }

  isOffline(): boolean {
      return !navigator.onLine;
  }

  public subir(){
    this.localSQLPrv.getAll().then((registros)=>{
      for(let r of registros){
        console.log('pasando por el service')
        this.regSrv.crearRegistro(r).then((res)=>{
          let rOnline =res[0];
          r.ciudad = rOnline.ciudad;
          r.provincia = rOnline.provincia;
          r.pais = rOnline.pais;
          this.localSQLPrv.delete(r);
        })
      }
    })
  }

}