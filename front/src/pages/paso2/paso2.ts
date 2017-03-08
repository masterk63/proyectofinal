import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Localsave } from '../../providers/localsave';


/*
  Generated class for the Paso2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-paso2',
  templateUrl: 'paso2.html'
})
export class Paso2Page {

  elmidos;
  patudos;
  plecopteros;
  tricopteros;
  coincidencia;
  fotoPaisaje;
  fotoMuestra;
  latitud;
  longitud;
  observaciones;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public localSaveCtrl:Localsave) {
     this.coincidencia = new FormGroup({
      "elmidos": new FormControl(),
      "patudos": new FormControl(),
      "plecopteros": new FormControl(),
      "tricopteros": new FormControl(),
      "observaciones": new FormControl(),
    });
    this.fotoPaisaje=this.navParams.get('foto1');
    this.fotoMuestra=this.navParams.get('foto2');
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paso2Page');
  }

doSubmit(event) {
    let elmidos = this.coincidencia.value.elmidos;
    let plecopteros = this.coincidencia.value.plecopteros;
    let tricopteros = this.coincidencia.value.tricopteros;
    let patudos = this.coincidencia.value.patudos;
    this.localSaveCtrl.crear(this.fotoPaisaje,this.fotoMuestra,patudos,elmidos,plecopteros,tricopteros,this.latitud,this.longitud);
    event.preventDefault();
  }

}
