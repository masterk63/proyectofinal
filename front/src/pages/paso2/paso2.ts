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
<<<<<<< HEAD
    console.log('Formulario', JSON.stringify(this.coincidencia.value));
=======
    // console.log('Submitting form', this.coincidencia.value);
    console.log('Elimido');
    console.log( this.coincidencia.value.elmido);
    console.log('Patudo');
    console.log(this.coincidencia.value.patudo);
    console.log('plecoptero');
    console.log(this.coincidencia.value.plecoptero);
    console.log('tricoptero');
    console.log( this.coincidencia.value.tricoptero);
>>>>>>> f6dc58c774b4fec016f1628b517d60183d557f43
    console.log("foto paisaje: ");
    console.log(this.fotoPaisaje);
    console.log("foto muestra: ");
    console.log(this.fotoMuestra);
    event.preventDefault();
    
  }

}
