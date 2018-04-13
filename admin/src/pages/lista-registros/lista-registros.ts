import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import Registro from '../../models/registro'

@Component({
  selector: 'lista-registros',
  templateUrl: 'lista-registros.html'
})

export class ListaRegistrosPage {

  mostrarTarjetas:boolean = false;
  registros:Array<Registro>;

  constructor(public navCtrl: NavController,
              public registroSrv:RegistrosService) {
    this.registroSrv.cargarRegistros().then(reg => {
      console.log(reg);
      this.registros = reg;
      this.mostrarTarjetas = true;
    })
  }

}
