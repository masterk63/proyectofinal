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

  langs;
  langs2;
  langForm;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.langForm = new FormGroup({
      "langs": new FormControl(),
      "langs2": new FormControl()
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paso2Page');
  }

doSubmit(event) {
    console.log('Submitting form', this.langForm.value);
    event.preventDefault();
  }

}
