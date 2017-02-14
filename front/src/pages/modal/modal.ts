import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

var foto;

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})

export class ModalPage {

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) 
    { 
    foto = params.get("foto");

    }
  foto1=foto;

  hola ="hola modal";
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
