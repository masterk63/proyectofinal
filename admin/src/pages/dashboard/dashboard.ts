import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListarProfesionalesPage } from '../listar-profesionales/listar-profesionales';
import { ListaOperacionesPage } from '../lista-operaciones/lista-operaciones';
import { CalendarioPage } from '../calendario/calendario';
import { TarjetasPage } from '../tarjetas/tarjetas';
import { FormTarjetaPage } from '../form-tarjeta/form-tarjeta';
import { NuevaOperacionPage } from '../nueva-operacion/nueva-operacion';
import { NuevaOperacionPaso2Page } from '../nueva-operacion-paso2/nueva-operacion-paso2';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  public ir(direccion) {
    switch (direccion) {
      case "operaciones":
        this.navCtrl.setRoot(ListaOperacionesPage);
        break;
      case "profesionales":
        this.navCtrl.setRoot(ListarProfesionalesPage);
        break;
      case "calendario":
        this.navCtrl.setRoot(CalendarioPage);
        break;
      case "tarjetas":
        this.navCtrl.setRoot(TarjetasPage);
        break;
    }
  }

}
