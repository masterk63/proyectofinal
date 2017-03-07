import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';


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

  elmido;
  patudo;
  plecoptero;
  tricoptero;
  coincidencia;
  fotoPaisaje;
  fotoMuestra;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.coincidencia = new FormGroup({
      "elmido": new FormControl(),
      "patudo": new FormControl(),
      "plecoptero": new FormControl(),
      "tricoptero": new FormControl()
    });
    this.fotoPaisaje=this.navParams.get('foto1');
    this.fotoMuestra=this.navParams.get('foto2');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paso2Page');
  }

doSubmit(event) {
    console.log('Formulario', JSON.stringify(this.coincidencia.value));
    console.log("foto paisaje: ");
    console.log(this.fotoPaisaje);
     console.log("foto muestra: ");
    console.log(this.fotoMuestra);
    event.preventDefault();
    
  }

}
