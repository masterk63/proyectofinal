import { Component,ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-lista-operaciones',
  templateUrl: 'lista-operaciones.html',
})
export class ListaOperacionesPage {

  Operaciones: any;
  operacion: any;
  loading:any;
  altura:any;
  fechaInicio:any;
  fechaFin:any;
  mostrarTarjetas = false;
  respuesta:any;
  montoTotal = 0;
  
  constructor(public navCtrl: NavController,
              public data: OperacionesProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public iab: InAppBrowser,
              public navParams: NavParams,
              public storage: Storage) {
                this.dameFecha();
  }

  setClasses(terjetaIn){
    let tar;
    switch (terjetaIn)
    {
      case 'AMEX':
        tar = 'fa-cc-amex';
        break;
      case 'VISA':
        tar = 'fa-cc-visa';
        break;
      case 'MASTER':
        tar = 'fa-cc-mastercard';
        break;
    }
      return tar;
  }
  

  ionViewDidLoad() {
    this.obtenerOperaciones();
  }
  
  obtenerOperaciones(){
    this.data.obtenerOperaciones().then((data)=>{
      this.Operaciones = data;
      if(this.Operaciones[0].codigo != 0){
          this.mostrarTarjetas = true;
          console.log("operaciones: ",this.Operaciones);
          this.montoTotal=0;
          for(let o of this.Operaciones){
            this.montoTotal = this.montoTotal + o.importeVenta;
          } 
          console.log("importe total de ventas: ",this.montoTotal)
      }
      
    }); 
  }

  verOperacion(operacion){
    this.navCtrl.push(VerOperacionPage, { operacion: operacion });
  }

  filtrar(){
    if(this.fechaInicio && this.fechaFin){
      this.showLoader();
      let inicio = this.fechaInicio.split('T');
      inicio = inicio[0];
      let fin = this.fechaFin.split('T');
      fin = fin[0];
      let details = {
              fechaInicio: inicio,
              fechaFin: fin,
        };
      this.data.obtenerOperacionesFiltrado(details).then((data)=>{
        this.loading.dismiss();
        this.Operaciones = data;
        if(this.Operaciones[0].codigo != 0){
          this.mostrarTarjetas = true;
          this.montoTotal=0;
          for(let o of this.Operaciones){
            this.montoTotal = this.montoTotal + o.importeVenta;
          } 
          console.log("importe total de ventas: ",this.montoTotal)
        }else{
          this.mostrarTarjetas = false;
        }
      });
    }else{
      this.mostrarAlerta('Error','Seleccione un rango de Fechas');
    }
  }

  exportar(){
    if(this.fechaInicio && this.fechaFin){
      console.log(this.fechaFin);
      let inicio = this.fechaInicio.split('T');
      inicio = inicio[0];
      let fin = this.fechaFin.split('T');
      fin = fin[0];
      console.log(fin)
      const browser = this.iab.create(`${configServer.data.urlServidor}/api/excel/${inicio}/${fin}`);
    }else{
      this.mostrarAlerta('Error','Seleccione un rango de Fechas');
    }
    
  }

  nuevaOperacion(){
    this.storage.get('idUsuario').then((respuesta) =>{
      let value = jwt.sign({
        idUsuario: respuesta
     }, 'shhola', { expiresIn: 5 * 60 });
      // let url = 'https://clubhonorarios.com/mpop/#/'+value;
      let url = 'http://localhost:81/mpop/#/'+value;
      const browser = this.iab.create(url);
    });
  }

  cargarOperacion(){
    this.navCtrl.setRoot('NuevaOperacion', { 'campos': '' });
  }

  mostrarAlerta(titulo,mensaje) {
    let alert = this.alertCtrl.create({
    title: titulo,
    subTitle: mensaje,
    buttons: ['ACEPTAR']
    });
    alert.present();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    this.loading.present();
  }

  showLoader2(mensaje){
      this.loading = this.loadingCtrl.create({
        content: mensaje
      });
      this.loading.present();
    }

  dameFecha(){
    this.showLoader2('Consultando operaciones en servidor');
    this.data.dameFechas().then((result) => {
          this.respuesta = result[0];
          if(this.respuesta.codigo === 1){
            console.log("fecha transaccion desde formulario 1 provider", this.respuesta.fechaTransaccion);
            this.fechaFin = this.respuesta.fechaTransaccion;
            this.fechaInicio = this.respuesta.fechaTransaccion;
            console.log('Fechas del Filtro')   
            console.log(this.fechaInicio)
            console.log(this.fechaFin)
            this.loading.dismiss();
          }
        }, (err) => {
          console.log("error promises en hora del servidor");
          this.loading.dismiss();
          this.mostrarAlerta('Error','Servidor inaccesible');
        });
  }

  ir(){
    this.navCtrl.setRoot(DashboardPage);
  }

}
