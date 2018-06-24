import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { LocalSqlProvider } from './local-sql/local-sql';
import { RegistrosService } from './registrosService';


@Injectable()
export class ConnectivityService {

  constructor(private network: Network,
    public regSrv: RegistrosService,
    public localSQLPrv: LocalSqlProvider) {

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

  async subir() {
    let registros = await this.localSQLPrv.getAll();
    console.log('pasando por el service y mostrando los registros', registros)
    for (let r of registros) {
      let rOnline = await this.regSrv.crearRegistro(r);
      if (rOnline[0].codigo > 0) {
        r.idRegistroOnline = rOnline[0].codigo;
        r.ciudad = rOnline[0].ciudad;
        r.provincia = rOnline[0].provincia;
        r.pais = rOnline[0].pais;
        r.fotoMapa = rOnline[0].fotoMapa;
        this.localSQLPrv.delete(r);
      }
    }
  }
}