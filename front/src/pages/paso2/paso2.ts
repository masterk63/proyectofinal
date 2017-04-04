import { Component } from '@angular/core';
import { AlertController, Platform, ModalController, NavController, NavParams} from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Localsave } from '../../providers/localsave';
import { ModalPage } from '../modal/modal';


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

  elmidos:any;
  patudos:any;
  plecopteros:any;
  tricopteros:any;
  coincidencia;
  fotoPaisaje;
  fotoMuestra;
  fotoElmido;
  realElmido;
  fotoPatudo;
  realPatudo;
  fotoPlecoptero;
  realPlecoptero;
  fotoTricoptero;
  realTricoptero;
  latitud;
  longitud;
  observaciones;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public localSaveCtrl:Localsave,
              public modalCtrl: ModalController,
              public plt: Platform,
              public alertCtrl: AlertController
    ){
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

//FOTOS PARA PASO 2 RADIO BUTTON

     if(this.plt.is('android') || this.plt.is('ios')){
          this.fotoElmido = "../www/assets/img/Elmidos.jpg";
      }else{
          this.fotoElmido = "../assets/img/Elmidos.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.fotoPatudo = "../www/assets/img/Patudo.jpg";
      }else{
          this.fotoPatudo = "../assets/img/Patudo.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.fotoPlecoptero = "../www/assets/img/Plecoptero.jpg";
      }else{
          this.fotoPlecoptero = "../assets/img/Plecoptero.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.fotoTricoptero = "../www/assets/img/Tricoptero.jpg";
      }else{
          this.fotoTricoptero = "../assets/img/Tricoptero.jpg";
      }

     if(this.plt.is('android') || this.plt.is('ios')){
          this.fotoElmido = "../www/assets/img/Elmidos.jpg";
      }else{
          this.fotoElmido = "../assets/img/Elmidos.jpg";
      }

//FOTOS REALES PARA MODAL!

      if(this.plt.is('android') || this.plt.is('ios')){
          this.realElmido = "../www/assets/img/fElmido.jpg";
      }else{
          this.realElmido = "../assets/img/fElmido.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.realPatudo = "../www/assets/img/fPatudo.jpg";
      }else{
          this.realPatudo = "../assets/img/fPatudo.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.realPlecoptero = "../www/assets/img/fPlecoptero.jpg";
      }else{
          this.realPlecoptero = "../assets/img/fPlecoptero.jpg";
      }

      if(this.plt.is('android') || this.plt.is('ios')){
          this.realTricoptero = "../www/assets/img/fTricoptero.jpg";
      }else{
          this.realTricoptero = "../assets/img/fTricoptero.jpg";
      }

    //  this.fotoElmido = "../assets/img/Elmidos.jpg";
    //  this.fotoPatudo = "../assets/img/Patudo.jpg";
    //  this.fotoPlecoptero = "../assets/img/Plecoptero.jpg";
    //  this.fotoTricoptero = "../assets/img/Tricoptero.jpg";
    //  this.realElmido = "../assets/img/fElmido.jpg";
    //  this.realPatudo = "../assets/img/fPatudo.jpg";
    //  this.realPlecoptero = "../assets/img/fPlecoptero.jpg";
    //  this.realTricoptero = "../assets/img/fTricoptero.jpg";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paso2Page');
  }

doSubmit(event) {
    this.elmidos = this.coincidencia.value.elmidos;
    this.plecopteros = this.coincidencia.value.plecopteros;
    this.tricopteros = this.coincidencia.value.tricopteros;
    this.patudos = this.coincidencia.value.patudos;
    let observaciones = this.coincidencia.value.observaciones;
    if(this.elmidos == null || this.plecopteros == null || this.tricopteros == null || this.patudos == null){
        let mensaje = "Debe seleccionar SI o NO en cada bicho."
        this.mostrarAlerta(mensaje);
    }else{
        this.localSaveCtrl.crear(this.fotoPaisaje,this.fotoMuestra,this.patudos,this.elmidos,this.plecopteros,this.tricopteros,this.latitud,this.longitud,observaciones);
        event.preventDefault();
    }
    
    
  }

    mostrarAlerta(mensaje) {
    let alert = this.alertCtrl.create({
      title: '¡Datos incompletos!',
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

    openModal(pic,name) {
        let modal = this.modalCtrl.create(ModalPage, {foto: pic, nombre: name});
        modal.present();
    }

}
