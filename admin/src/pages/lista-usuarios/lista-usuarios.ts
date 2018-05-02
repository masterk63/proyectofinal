import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/es';
import { UsuariosService } from '../../providers/usuariosService'
import Usuario from '../../models/usuario'

//Table
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'lista-usuarios',
  templateUrl: 'lista-usuarios.html'
})
export class ListaUsuariosPage {
  mostrarTarjetas: boolean = false;
  displayedColumns = ['alumno', 'usuario', 'institucion', 'estado', 'registros', 'acciones'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  @ViewChild('paginator') paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  idRegistro: number = -1;
  opened: boolean = false;
  filtrosEstado = [{nombre:'Pendiente',estado:true,valor:0},{nombre:'Valido',estado:false,valor:1},{nombre:'Invalido',estado:false,valor:-1},{nombre:'Todos',estado:false,valor:10}]
  filtrosTemporales = [{nombre:'Ultima Semana',estado:true,valor:''},{nombre:'Ultimo Mes',estado:false,valor:''},{nombre:'',estado:false,valor:''}]
  fechaActual:any;
  fechaHaceUnaSemana:any;
  now:any;
  lastWeek:any;
  lastMonth:any;
  fechaInicio:any;
  fechaFin:any;
  usuarios: Array<Usuario>;

  constructor(public navCtrl: NavController,
              private userSrv:UsuariosService) {
    this.lastWeek = moment().subtract(1,'week').toISOString().split("T")[0];
    this.lastMonth = moment().subtract(1,'month').toISOString().split("T")[0];
    this.filtrosTemporales[0].valor = this.lastWeek;
    this.filtrosTemporales[1].valor = this.lastMonth;
    this.fechaActual = moment().format("DD, MMM YYYY");
    this.fechaHaceUnaSemana = moment().format("DD, MMM YYYY");
    this.cargarRegistros();
  }

  cargarRegistros(){
    this.userSrv.cargarUsuarios().then(usr => {
      console.log(usr);
      this.usuarios = usr;
      this.mostrarTarjetas = true;
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
