import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListaRegistrosPage } from '../lista-registros/lista-registros';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-mis-registros',
  templateUrl: 'mis-registros.html',
})

export class MisRegistrosPage {
  idUsuario:number;
  
  constructor(public storage: Storage){
    
  }

  ionViewWillEnter(){
    this.idUsuario = 0;
    this.storage.get('idUsuario').then((idUsuario) => {
      this.idUsuario = idUsuario;
    });
  }

}


