import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UsuariosService } from '../../providers/usuariosService'
import Usuario from '../../models/usuario'
import { UsuarioPage } from '../../pages/usuario/usuario'
import { RegistroPage } from '../registro/registro'
import { HeaderComponent } from '../../components/header/header'

//Table
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ExcelServiceProvider } from '../../providers/excel-service/excel-service';

@Component({
  selector: 'lista-usuarios',
  templateUrl: 'lista-usuarios.html'
})
export class ListaUsuariosPage {
  mostrarTarjetas: boolean = false;
  displayedColumns = ['alumno', 'mail', 'institucion', 'estado', 'registros', 'acciones'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  @ViewChild('paginator') paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  idUsuarios: number = -1;
  opened: boolean = false;
  filtrosEstado = [{ nombre: 'Activos', estado: true, valor: 'A' }, { nombre: 'Inactivos', estado: false, valor: 'B' }]
  usuarios: Array<Usuario>;
  idUsuario: any;
  mostrandoUnRegistro: boolean = false;
  idRegistro: number = -1;
  loading: any;

  constructor(public navCtrl: NavController,
    public excelCtrl: ExcelServiceProvider,
    public loadingCtrl: LoadingController,
    private userSrv: UsuariosService) {
    this.cargarRegistros('A');
    this.idUsuario = -1;
  }

  cargarRegistros(estado) {
    let request = {
      estado
    }
    this.mostrandoUnRegistro = false;
    this.idUsuario = -1;
    this.opened = false;
    this.showLoader('Cargando usuarios...');
    this.userSrv.cargarUsuarios(request).then(usr => {
      console.log(usr);
      this.usuarios = usr;
      this.mostrarTarjetas = true;
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading.dismiss();
    })
  }

  exportarExcel() {
    console.log('hola', this.usuarios)
    this.excelCtrl.exportAsExcelFile(this.usuarios, 'Lista de Usuarios')
  }

  filtroEstadoChange(c) {
    for (let f of this.filtrosEstado) {
      f.estado = false;
    }
    c.estado = true;
    this.cargarRegistros(c.valor);
  }


  filterItems(searchTerm) {
    this.dataSource = new MatTableDataSource<Usuario>(this.usuarios.filter((atributo) => {
      return atributo.filtro.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1;
    }));
  }

  verUsuario(id) {
    if (!this.opened) {
      this.opened = true;
    }
    this.mostrandoUnRegistro = false;
    this.idUsuario = id;
  }

  mostrarRegistroPage(id) {
    this.idRegistro = id;
    this.mostrandoUnRegistro = true;
  }

  refrescar(mensaje) {
    if (mensaje === 'ok') {
      this.filtrosEstado[0].estado = true;
      this.filtrosEstado[1].estado = false;
      this.cargarRegistros('A');
    }

  }

  volverAUsuario() {
    this.mostrandoUnRegistro = false;
  }

  showLoader(mensaje) {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    });
    this.loading.present();
  }

}
