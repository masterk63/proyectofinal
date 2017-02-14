import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})

export class ModalPage {

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) { 
    var foto = params.get("foto");
    }

  hola ="hola modal";

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
