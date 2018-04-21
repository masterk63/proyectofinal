import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import Registro from '../../models/registro'
import { ViewController } from 'ionic-angular';
import {RegistroPage} from '../registro/registro'
//Table
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule,MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'lista-registros',
  templateUrl: 'lista-registros.html'
})

export class ListaRegistrosPage {
  
  mostrarTarjetas:boolean = false;
  registros:Array<Registro>;
  displayedColumns = ['select','idRegistro','fecha','alumno','ubicacion','indice','acciones'];
  dataSource:any;
  selection = new SelectionModel<Registro>(true, []);
  @ViewChild('paginator') paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  idRegistro:number = -1;
  opened:boolean = false;

  constructor(public navCtrl: NavController,
              public registroSrv:RegistrosService) {    
  }

  ngAfterViewInit() {
    this.registroSrv.cargarRegistros().then(reg => {
      console.log(reg);
      this.registros = reg;
      this.mostrarTarjetas = true;
      this.dataSource = new MatTableDataSource<Registro>(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  dameSeleccion(){
    console.log(this.selection);
  }

  verRegistro(id){
    if(!this.opened){
      this.opened = true;
    }
    this.idRegistro = id;
  }

}


