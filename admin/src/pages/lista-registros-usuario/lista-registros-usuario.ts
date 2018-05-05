import { Component, NgZone, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { MenuController, Platform } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
// import 'web-animations-js/web-animations.min';
import { Events } from 'ionic-angular';

declare var Connection: any;

@Component({
  selector: 'lista-registros-usuario',
  templateUrl: 'lista-registros-usuario.html',
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: .5, offset: 0.3 }),
            style({ opacity: 1, offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('800ms ease-in', keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: .5, offset: 0.3 }),
            style({ opacity: 0, offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ]
})
export class ListaRegistrosPageUsuario {

  registros: any;
  registrosOnline: any = [];
  fotoMapaNoDisponible: any;
  @Input() idUsuario;
  @Input() leavePage;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public registrosCtrl: RegistrosService,
    public alertCtrl: AlertController,
    public platform: Platform,
    private menu: MenuController,
    private _zone: NgZone) {

  }

  ionViewDidLoad() {

  }

  ngOnChanges() {
    if (this.idUsuario && this.idUsuario > 0) {
        this.registrosCtrl.cargarRegistrosUsuario(this.idUsuario).then((registros) => {
          console.log('registros en el servidor', registros);
          this.registrosOnline = registros;
          this.registrosOnline = this.registrosOnline.reverse();
        }).catch(e => {
          this.mostrarAlerta('Error', 'No se puede comunicar con el servidor')
        })
    }
  }

  irAlRegistro(id) {
    this.navCtrl.push(RegistroPage, { idRegistro: id })
  }

  mostrarAlerta(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

}
