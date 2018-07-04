import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { LocalSqlProvider } from './local-sql/local-sql';
import { RegistrosService } from './registrosService';
import { Events } from 'ionic-angular';

declare var cordova;

@Injectable()
export class ConnectivityService {

  constructor(private network: Network,
    public regSrv: RegistrosService,
    public events: Events,
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
      setTimeout(async () => {
        let registros = await this.localSQLPrv.getAll();
        if (registros.length != 0) {
          this.enviarNotificacion();
          this.subir();
        }
      }, 10000);
    });

  }

  isOnline(): boolean {
    return navigator.onLine;
  }

  isOffline(): boolean {
    return !navigator.onLine;
  }

  async subir() {
    //hay registros para subir, implementamos una notificacion
    let registros = await this.localSQLPrv.getAll();
    console.log('pasando por el service y mostrando los registros', registros)
    let index = 1;
    for (let r of registros) {
      this.events.publish('uploadProcess', { indice: index, total: registros.length });
      let rOnline = await this.regSrv.crearRegistro(r);
      if (rOnline[0].codigo > 0) {
        r.idRegistroOnline = rOnline[0].codigo;
        r.ciudad = rOnline[0].ciudad;
        r.provincia = rOnline[0].provincia;
        r.pais = rOnline[0].pais;
        r.fotoMapa = rOnline[0].fotoMapa;
        this.localSQLPrv.delete(r);
      }
      index++;
    }
    this.events.publish('uploadProcess', { indice: '-', total: '-' });
    this.events.publish('uploadProcessSize', { indice: 0, total: 100 });
  }

  enviarNotificacion() {
    cordova.plugins.notification.local.schedule({
      title: 'Aguita',
      text: "¡Ahora que tienes conexion, abre la aplicacion para subir los registros!",
      foreground: true,
    });
  }
}