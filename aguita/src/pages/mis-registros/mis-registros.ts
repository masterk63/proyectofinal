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
import { ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition,query,stagger,keyframes} from '@angular/animations';
import 'web-animations-js/web-animations.min';


declare var Connection: any;


@Component({
  selector: 'page-mis-registros',
  templateUrl: 'mis-registros.html',
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: .5, offset: 0.3}),
            style({opacity: 1, offset: 1.0}),
          ]))]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('800ms ease-in', keyframes([
              style({opacity: 1,  offset: 0}),
              style({opacity: .5, offset: 0.3}),
              style({opacity: 0, offset: 1.0}),
            ]))]), {optional: true})
      ])
    ])

  ]
})
export class MisRegistrosPage {

  registros: any;
  registrosOnline: any = [];
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

    this.registrosCtrl.cargarRegistros().then((registros) => {
      console.log('registros en el servidor', registros);
      this.registrosOnline = registros;
      this.registrosOnline = this.registrosOnline.reverse();
    })

    if (this.platform.is('cordova')) {
      this.fotoMapaNoDisponible = "../www/assets/img/mapNotAvalible.jpg";
      this.localSQL.getAll().then((reg) => {
        console.log('registros locales', reg);
        this.registros = reg;
      });
    } else {
      this.fotoMapaNoDisponible = "../assets/img/mapNotAvalible.jpg";
    }
  }

  ionViewDidLoad() {


  }

  borarDB() {
    this.localSQL.destruirDB();
  }

  borrarRegistro(id) {
    let index = this.registros.map(function (reg) { return reg.idRegistro; }).indexOf(id);
    let reg = this.registros.splice(index, 1);
    reg = reg[0];
    setTimeout(() => {
      this.registrosOnline.unshift(reg);
    }, 1000);
  }
}
