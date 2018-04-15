import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import Registro from '../../models/registro'
import { PopoverController,ViewController } from 'ionic-angular';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'lista-registros',
  templateUrl: 'lista-registros.html'
})

export class ListaRegistrosPage {
  
  mostrarTarjetas:boolean = false;
  registros:Array<Registro>;
  displayedColumns = ['idRegistro','Fecha','Alumno','Ubicacion','Indice','Acciones'];
  dataSource:any;
  @ViewChild('paginator') paginator: any;
  
  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public registroSrv:RegistrosService) {    
  }

  ngAfterViewInit() {
    this.registroSrv.cargarRegistros().then(reg => {
      console.log(reg);
      this.registros = reg;
      this.mostrarTarjetas = true;
      this.dataSource = new MatTableDataSource<Registro>(this.registros);
      this.dataSource.paginator = this.paginator;
    })
  }


}


