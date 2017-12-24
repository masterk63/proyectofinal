import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Localsave } from '../../providers/localsave';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { RegistroPage } from '../registro/registro';
import { MenuController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { LocalSqlProvider } from '../../providers/local-sql/local-sql';
import { RegistrosService } from '../../providers/registrosService';

declare var Connection: any;


@Component({
   selector: 'page-mis-registros',
   templateUrl: 'mis-registros.html'
})
export class MisRegistrosPage {

   registros: any;
   registrosOnline:any;
   fotoMapaNoDisponible: any;

   constructor(public navCtrl: NavController,
      public authService: Auth,
      public navParams: NavParams,
      public localSaveCtrl: Localsave,
      public registrosCtrl: RegistrosService,
      private network: Network,
      public platform: Platform,
      public localSQL: LocalSqlProvider,
      private menu: MenuController,
      private _zone: NgZone) {
     
      this.registrosCtrl.cargarRegistros().then((registros)=>{
        console.log('registros en el servidor',registros);
        this.registrosOnline = registros;
      })
      
      if (this.platform.is('cordova')) {
         this.fotoMapaNoDisponible = "../www/assets/img/mapNotAvalible.jpg";
         this.localSQL.getAll().then((reg)=>{
            console.log('registros locales',reg);
            this.registros = reg;
        });
      } else {
         this.fotoMapaNoDisponible = "../assets/img/mapNotAvalible.jpg";
      }
   }

   ionViewDidLoad() {

    
   }
   
   borarDB(){
     this.localSQL.destruirDB();
   }
}
