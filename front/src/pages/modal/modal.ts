import { Directive, Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})

export class ModalPage {

  foto: any;

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) 
    { 
    this.foto = params.get("foto");
    }

  hola ="hola modal";
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
