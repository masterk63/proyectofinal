import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListaRegistrosPage } from '../lista-registros/lista-registros';

@Component({
  selector: 'page-mis-registros',
  templateUrl: 'mis-registros.html',
})
export class MisRegistrosPage {
  ionViewWillEnter(){
    console.log('enter registros')
  }
}


