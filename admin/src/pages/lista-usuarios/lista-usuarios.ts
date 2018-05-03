import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  idUsuarios: number = -1;
  opened: boolean = false;
  filtrosEstado = [{ nombre: 'Activos', estado: true, valor: 'A' }, { nombre: 'Inactivos', estado: false, valor: 'B' }]
  usuarios: Array<Usuario>;

  constructor(public navCtrl: NavController,
    private userSrv: UsuariosService) {
    this.cargarRegistros('A');
  }

  cargarRegistros(estado) {
    let request = {
      estado
    }
    this.userSrv.cargarUsuarios(request).then(usr => {
      console.log(usr);
      this.usuarios = usr;
      this.mostrarTarjetas = true;
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  filtroEstadoChange(c) {
    this.cargarRegistros(c.valor);
  }

  // filterItems(searchTerm, filtro) {
  filterItems(searchTerm, filtro) {
    this.dataSource = new MatTableDataSource<Usuario>(this.usuarios.filter((atributo) => {
      switch (filtro) {
        case "apellido":
          return atributo.apellido.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1;
        case "mail":
          return atributo.mail.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1;
      }
    }));
  }

}
