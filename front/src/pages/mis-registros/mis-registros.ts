import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Localsave } from '../../providers/localsave';
import {File, Transfer, FilePath } from 'ionic-native';

@Component({
  selector: 'page-mis-registros',
  templateUrl: 'mis-registros.html'
})
export class MisRegistrosPage {

  registros:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public localSaveCtrl:Localsave) {
                this.localSaveCtrl.getTodos().then((data) => {
                  this.registros = data[0].registros;
                  console.log(this.registros);
                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisRegistrosPage');
  }

}
