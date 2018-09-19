import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import Registro from '../../models/registro'
import { ViewController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro'
import * as moment from 'moment';
import 'moment/locale/es';
import { HeaderComponent } from '../../components/header/header';


//Table
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExcelServiceProvider } from '../../providers/excel-service/excel-service';

@Component({
  selector: 'lista-registros',
  templateUrl: 'lista-registros.html'
})

export class ListaRegistrosPage {

  mostrarTarjetas: boolean = false;
  registros: Array<Registro>;
  displayedColumns = ['select', 'fecha', 'alumno', 'ubicacion', 'estado', 'indice', 'acciones'];
  dataSource: any;
  selection = new SelectionModel<Registro>(true, []);
  @ViewChild('paginator') paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  idRegistro: number = -1;
  opened: boolean = false;
  filtrosEstado = [{ nombre: 'Pendiente', estado: true, valor: 0 }, { nombre: 'Valido', estado: false, valor: 1 }, { nombre: 'Invalido', estado: false, valor: -1 }, { nombre: 'Todos', estado: false, valor: 10 }]
  filtrosTemporales = [{ nombre: 'Ultima Semana', estado: true, valor: '' }, { nombre: 'Ultimo Mes', estado: false, valor: '' }, { nombre: '', estado: false, valor: '' }]
  fechaActual: any;
  fechaVieja: any;
  now: any;
  lastWeek: any;
  lastMonth: any;
  fechaInicio: any;
  fechaFin: any;
  mensajeDeFechas: any;
  loading: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public excelCtrl: ExcelServiceProvider,
    public loadingCtrl: LoadingController,
    public registroSrv: RegistrosService) {
    this.now = moment().toISOString().split("T")[0];
    this.lastWeek = moment().subtract(1, 'week').toISOString().split("T")[0];
    this.lastMonth = moment().subtract(1, 'month').toISOString().split("T")[0];
    this.filtrosTemporales[0].valor = this.lastWeek;
    this.filtrosTemporales[1].valor = this.lastMonth;
    this.fechaActual = moment().format("DD, MMM YYYY");
    this.fechaVieja = moment().subtract(1, 'week').format("DD, MMM YYYY");
    this.mensajeDeFechas = 'de los ulitmos 7 dias ';
  }

  ngAfterViewInit() {
    let filtro = {
      now: this.now,
      lastWeek: this.lastWeek,
      estado: 0
    }
    this.cargarRegistros(filtro);
  }

  cargarRegistros(filtro) {
    this.showLoader('Cargando registros...');
    this.registroSrv.cargarRegistros(filtro).then(reg => {
      console.log(reg);
      this.registros = reg;
      this.mostrarTarjetas = true;
      this.dataSource = new MatTableDataSource<Registro>(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading.dismiss();
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

  verRegistro(id) {
    if (!this.opened) {
      this.opened = true;
    }
    this.idRegistro = id;
  }

  filtroEstadoChange(chip) {
    for (let c of this.filtrosEstado) {
      c.estado = false;
    }
    chip.estado = true;
    this.filtrarRegistros();
  }

  filtroTemporalChange(chip) {
    for (let c of this.filtrosTemporales) {
      c.estado = false;
    }
    chip.estado = true;
    this.filtrarRegistros();
  }

  filtrarRegistros() {
    this.selection.clear();
    let estado = this.filtrosEstado.find(f => f.estado == true);
    let fecha = this.filtrosTemporales.find(f => f.estado == true);
    let filtro;
    if (fecha.nombre) {
      if (fecha.nombre == 'Ultima Semana') {
        this.mensajeDeFechas = 'de los ulitmos 7 dias ';
        this.fechaVieja = moment().subtract(1, 'week').format("DD, MMM YYYY");
      } else {
        this.mensajeDeFechas = 'del ultimo mes ';
        this.fechaVieja = moment().subtract(1, 'month').format("DD, MMM YYYY");

      }
      filtro = {
        now: this.now,
        lastWeek: fecha.valor,
        estado: estado.valor
      }
    } else {
      filtro = {
        now: moment(this.fechaFin).toISOString().split('T')[0],
        lastWeek: moment(this.fechaInicio).toISOString().split('T')[0],
        estado: estado.valor
      }
    }
    this.cargarRegistros(filtro);
  }

  filtrarPorRangoFecha() {
    this.selection.clear();
    this.mensajeDeFechas = 'del rango de fecha de ';
    for (let c of this.filtrosTemporales) {
      c.estado = false;
    }
    this.filtrosTemporales[2].estado = true;
    let estado = this.filtrosEstado.find(f => f.estado == true);
    this.fechaActual = moment(this.fechaFin).format("DD, MMM YYYY");
    this.fechaVieja = moment(this.fechaInicio).format("DD, MMM YYYY");
    let filtro = {
      now: moment(this.fechaFin).toISOString().split('T')[0],
      lastWeek: moment(this.fechaInicio).toISOString().split('T')[0],
      estado: estado.valor
    }
    this.cargarRegistros(filtro);
  }

  validarMultipleSeleccion() {
    if (this.selection.selected.length) {
      if (!this.selection.selected.find(r => r.estado == '1')) {
        let registrosAValidar = this.selection.selected.filter(r => r.estado != '1');
        let reg = registrosAValidar.map(r => r.idRegistro).toString();
        console.log(reg);
        this.registroSrv.registroValidar(reg).then(res => {
          this.presentToast('Registros Actulizados Correctamente');
          this.filtrarRegistros();
        }).catch(e => this.mostrarAlerta('Error', e));
      } else {
        this.mostrarAlerta('Error', 'Solo se puede validar registros que no se hallan valido previamente');
      }
    }
  }

  invalidarMultipleSeleccion() {
    if (this.selection.selected.length) {
      if (!this.selection.selected.find(r => r.estado != '1')) {
        let registrosAValidar = this.selection.selected.filter(r => r.estado == '1');
        let reg = registrosAValidar.map(r => r.idRegistro).toString();
        console.log(reg);
        this.registroSrv.registroInvalidar(reg).then(res => {
          this.presentToast('Registros Actulizados Correctamente');
          this.filtrarRegistros();
        }).catch(e => this.mostrarAlerta('Error', e));
      } else {
        this.mostrarAlerta('Error', 'Solo se puede invalidar registros ya validados');
      }
    }
  }

  validarRegistro(idReg) {
    this.registroSrv.registroValidar(idReg).then(res => {
      this.presentToast('Registro Actulizado Correctamente');
      this.filtrarRegistros();
    }).catch(e => this.mostrarAlerta('Error', e));
  }

  invalidarRegistro(idReg) {
    this.registroSrv.registroInvalidar(idReg).then(res => {
      this.presentToast('Registro Actulizado Correctamente');
      this.filtrarRegistros();
    }).catch(e => this.mostrarAlerta('Error', e));
  }

  exportarExcel() {
    console.log(this.registros)
    let mappedArray = this.registros.map(r => {
      let Validado;
      switch (r.estado) {
        case '1':
          Validado = 'Si'
          break;
        case '-1':
          Validado = 'No'
          break;
        case '0':
          Validado = 'Pendiente'
          break;
      }
      return {
        Evento_ID: r.idRegistro,
        Usuario: r.usuario,
        Apellido: r.apellido,
        Nombres: r.nombre,
        Hora: moment(r.fecha).format('HH:mm'),
        Fecha: moment(r.fecha).format('DD/MM/YYYY'),
        Latitud_localización: r.latitud,
        Longitud_localización: r.longitud,
        Latitud_foto: r.latitudFoto,
        Longitud_foto: r.longitudFoto,
        Criterio_100m: r.criterioCienMetros,
        Indice: r.indice,
        Observaciones_usuario: r.observacion,
        Validado,
        Validador_Admin: r.nombreAdmin
      }
    })
    console.log(mappedArray)
    this.excelCtrl.exportAsExcelFile(mappedArray, 'Registros desde ' + this.fechaVieja + ' a ' + this.fechaActual);
  }

  mostrarAlerta(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  showLoader(mensaje) {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    });
    this.loading.present();
  }


}


