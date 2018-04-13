import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import Registro from '../../models/registro'
import { PopoverController,ViewController } from 'ionic-angular';
import {PopoverPage} from './popOver';

@Component({
  selector: 'lista-registros',
  templateUrl: 'lista-registros.html'
})

export class ListaRegistrosPage {

  mostrarTarjetas:boolean = false;
  registros:Array<Registro>;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public registroSrv:RegistrosService) {

    this.registroSrv.cargarRegistros().then(reg => {
      console.log(reg);
      this.registros = reg;
      this.mostrarTarjetas = true;
    })
    
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}


