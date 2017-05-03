import { Component } from '@angular/core';
import { FabContainer, AlertController, NavController, NavParams, LoadingController,Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { RegistrosService } from '../../providers/registrosService';
import { Auth } from '../../providers/auth';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login-page/login-page';
import { UsuarioPage } from '../usuario/usuario';
import { MisRegistrosPage } from '../mis-registros/mis-registros';
/*
  Generated class for the Registro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  consultaArray: any;
  attachments:any;
  loading: any;
  idRegistro: any;
  posicion: any;
  registro: any;
  fotoPaisajeURL = 'data:image/jpeg;base64,';
  fotoMuestraURL = 'data:image/jpeg;base64,';
  fotoMapaURL = 'data:image/jpeg;base64,';
  fotoMuestraURLSafe:any;
  fotoMapaURLSafe: any;
  fotoMapaNoDisponible:any;
  valido: any;
  rol=null;
  // Atributos del registro que viene de mysql:
  // *idRegistro
  // *indice
  // *fecha
  // *latitud
  // *longitud
  // *observacion
  // *valido
  // **idUsuario
  // **nombreUsuario ** inner join con usuarios en idUsuario
  // *elmido
  // *patudo
  // *plecoptero
  // *tricoptero
  // *ciudad
  // *provincia
  // *pais
  // *fotoPaisaje
  // *fotoMuestra
  // *fotoMapa

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public regService: RegistrosService,
              public authService: Auth,
              private sanitizer:DomSanitizer,
              public storage: Storage,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public platform: Platform,
              ){
                if(this.platform.is('android') || this.platform.is('ios')){
                    this.fotoMapaNoDisponible = "../www/assets/img/mapNotAvalible.jpg";
                }else{
                    this.fotoMapaNoDisponible = "../assets/img/mapNotAvalible.jpg";
                }
                this.dameRol();
                this.idRegistro = this.params.get('idRegistro');
                this.posicion = this.params.get('posicion');
                if(this.params.get('donde') == "mis registros"){
                  this.armarRegistroLocal();
                }else{
                  this.registroDame();
                }
                
              }

  armarRegistroLocal(){
    this.attachments = this.params.get('attachments');
    this.fotoPaisajeURL = this.fotoPaisajeURL + this.attachments["fotoPaisaje.png"].data;
    this.fotoMuestraURL = this.fotoMuestraURL + this.attachments["fotoMuestra.png"].data;
    this.fotoMapaURL = this.fotoMapaURL + this.attachments["fotoMapa.png"].data;
    this.fotoMuestraURLSafe= this.sanitizer.bypassSecurityTrustUrl(this.fotoMuestraURL );
    this.fotoMapaURLSafe= this.sanitizer.bypassSecurityTrustUrl(this.fotoMapaURL );
    this.consultaArray = {fecha: this.params.get('fecha'),
                          ciudad: this.params.get('ciudad'),
                          provincia: this.params.get('provincia'),
                          pais: this.params.get('pais'),
                          latitud: this.params.get('latitud'),
                          longitud: this.params.get('longitud'),
                          indice: this.params.get('indice'),
                          elmido: this.params.get('elmido'),
                          patudo: this.params.get('patudo'),
                          plecoptero: this.params.get('plecoptero'),
                          tricoptero: this.params.get('tricoptero'),
                          observacion: this.params.get('observacion'),
                          usuario: null,
                          valido: null,
                          idRegistro: null,
                          };
  this.registro = this.consultaArray;
  }

  registroDame() {
    this.showLoader();
    this.regService.registroDame(this.idRegistro)
          .then(data => {
            this.registro = data;
            this.registro = this.registro[0];
            console.log(this.registro);
            this.fotoPaisajeURL = this.fotoPaisajeURL + this.registro.fotoPaisaje;
            this.fotoMuestraURL = this.fotoMuestraURL + this.registro.fotoMuestra;
            this.fotoMapaURL = this.fotoMapaURL + this.registro.fotoMapa;
            this.fotoMuestraURLSafe= this.sanitizer.bypassSecurityTrustUrl(this.fotoMuestraURL );
            this.fotoMapaURLSafe= this.sanitizer.bypassSecurityTrustUrl(this.fotoMapaURL );
            this.validoToArray();
            if(this.registro.observacion == "null"){
              this.registro.observacion = "No hay observaciones."
            }
            this.loading.dismiss();
          }).catch((err)=> {this.loading.dismiss(),
                          this.mostrarAlerta("No se puede conectar con el servidor",err),
                          this.navCtrl.push(MisRegistrosPage);
                        });
  }

  validoToArray(){
    if(this.registro.valido == -1){
      this.valido = 'Invalido';
    }else{
        if(this.registro.valido == 0){
          this.valido = 'Pendiente de validacion';
        }else{
          this.valido = 'Valido';
        }
    }
  }

  validarRegistro(idRegistro){
    this.regService.registroValidar(this.registro.idRegistro)
      .then(data => {
        let mensajeBaja = data;
        if(mensajeBaja[0].codigo > 0){
          let titulo = "Correcto";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje,titulo);
          //modificamos del vector registros, el que acabamos de validar, a traves de la posicion por el TWO DATA BINDING en el componente GESTOR USUARIOS, para modificar el DOM
            this.regService.registros[this.posicion].valido = 1; // el primera variable es el elemento del array (0-n indexado)
          this.registro.valido = 1;
          this.validoToArray();
        }else{
          let titulo = "Error";
           let mensaje = mensajeBaja[0].mensaje;
            this.mostrarAlerta(mensaje,titulo);
        }
        }).catch((err)=> {this.mostrarAlerta("No se puede conectar con el servidor",err)
                        });
  }

  invalidarRegistro(idRegistro){
    this.regService.registroInvalidar(this.registro.idRegistro)
      .then(data => {
        let mensajeBaja = data;
        if(mensajeBaja[0].codigo > 0){
          let titulo = "Correcto";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje,titulo);
          //modificamos del vector registros, el que acabamos de validar, a traves de la posicion por el TWO DATA BINDING en el componente GESTOR USUARIOS, para modificar el DOM
            this.regService.registros[this.posicion].valido = -1; // el primera variable es el elemento del array (0-n indexado)
          this.registro.valido = -1;
          this.validoToArray();
        }else{
          let titulo = "Error";
           let mensaje = mensajeBaja[0].mensaje;
            this.mostrarAlerta(mensaje,titulo);
        }
        }).catch((err)=> {this.mostrarAlerta("No se puede conectar con el servidor",err)
                        });
  }

  verUsuario(idUsuario){
      this.navCtrl.push(UsuarioPage,{idUsuario});
  }

  mensajeConfirmar(idRegistro,accion, fab: FabContainer) {
    fab.close();
    let confirm = this.alertCtrl.create({
      title: accion.charAt(0).toUpperCase()+accion.slice(1)+' Registro',
      message: '¿Esta seguro que desea '+accion+' el Registro N° '+this.registro.idRegistro+'?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            if(accion == 'validar'){
              this.validarRegistro(idRegistro);
              
            }else{
              this.invalidarRegistro(idRegistro);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  mostrarAlerta(mensaje,titulo) {
      let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: mensaje,
        buttons: ['ACEPTAR']
      });
      alert.present();
    }

  dameRol(){
    this.storage.get('rol').then((value) => {
          this.rol = value;
      });
  }

  showLoader(){
    console.log("llamando a loading");
        this.loading = this.loadingCtrl.create({
            content: "Cargando registro. Espere por favor..."
        });
        this.loading.present();
    }

    controlarFotoMapa(){
      if(this.registro.fotoMapa.length > 2){
        return true;
      }
      else{
        return false;
      }
  }


  logout(){
    console.log('saliendo logout');
    this.authService.logout().then(()=>{
      console.log('listo borrado, dirijiendo a registrar');
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
