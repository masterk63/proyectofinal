import { Component,Input, AnimationStyleMetadata } from '@angular/core';
import { FabContainer, AlertController, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { RegistrosService } from '../../providers/registrosService';
import { ImageViewerController } from 'ionic-img-viewer';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  consultaArray: any;
  attachments: any;
  loading: any;
  posicion: any;
  registro: any;
  fotoMuestraURL:any;
  fotoMapaURL:any;
  fotoPaisajeURL:any;
  fotoMuestraURLSafe: any;
  fotoMapaURLSafe: any;
  fotoPaisajeURLSafe: any;
  valido: any;
  rol = null;
  _imageViewerCtrl: ImageViewerController;
  @Input() idRegistro:any;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public regService: RegistrosService,
    private sanitizer: DomSanitizer,
    public imageViewerCtrl: ImageViewerController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
  ) {
    // this.dameRol();
    this._imageViewerCtrl = imageViewerCtrl;
  }

  ngOnChanges(){
    if(this.idRegistro > 0){
      this.registroDame();
    }
  }
  registroDame() {
    this.showLoader();
    this.regService.registroDame(this.idRegistro).then(data => {
      this.registro = data;
      this.registro = this.registro[0];
      (this.registro.elmido == 1) ? this.registro.elmido = 'SI' : this.registro.elmido = 'NO';
      (this.registro.patudo == 1) ? this.registro.patudo = 'SI' : this.registro.patudo = 'NO';
      (this.registro.plecoptero == 1) ? this.registro.plecoptero = 'SI' : this.registro.plecoptero = 'NO';
      (this.registro.tricoptero == 1) ? this.registro.tricoptero = 'SI' : this.registro.tricoptero = 'NO';
      console.log(this.registro);
      this.fotoPaisajeURL = 'data:image/jpeg;base64,' + this.registro.fotoPaisaje;
      this.fotoMuestraURL = 'data:image/jpeg;base64,' + this.registro.fotoMuestra;
      this.fotoMapaURL = 'data:image/jpeg;base64,' + this.registro.fotoMapa;
      this.fotoMuestraURLSafe = this.sanitizer.bypassSecurityTrustUrl(this.fotoMuestraURL);
      this.fotoMapaURLSafe = this.sanitizer.bypassSecurityTrustUrl(this.fotoMapaURL);
      this.fotoPaisajeURLSafe = this.sanitizer.bypassSecurityTrustUrl(this.fotoPaisajeURL);
      this.loading.dismiss();
    }).catch((err) => {
      this.loading.dismiss(),
      this.mostrarAlerta("No se puede conectar con el servidor", err);
      // this.navCtrl.push(MisRegistrosPage);
    });
  }

  validoToArray() {
    if (this.registro.valido == -1) {
      this.valido = 'Invalido';
    } else {
      if (this.registro.valido == 0) {
        this.valido = 'Pendiente de validacion';
      } else {
        this.valido = 'Valido';
      }
    }
  }

  validarRegistro(idRegistro) {
    this.regService.registroValidar(this.registro.idRegistro)
      .then(data => {
        let mensajeBaja = data;
        if (mensajeBaja[0].codigo > 0) {
          let titulo = "Correcto";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
          //modificamos del vector registros, el que acabamos de validar, a traves de la posicion por el TWO DATA BINDING en el componente GESTOR USUARIOS, para modificar el DOM
          this.regService.registros[this.posicion].valido = 1; // el primera variable es el elemento del array (0-n indexado)
          this.registro.valido = 1;
          this.validoToArray();
        } else {
          let titulo = "Error";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
        }
      }).catch((err) => {
        this.mostrarAlerta("No se puede conectar con el servidor", err)
      });
  }

  invalidarRegistro(idRegistro) {
    this.regService.registroInvalidar(this.registro.idRegistro)
      .then(data => {
        let mensajeBaja = data;
        if (mensajeBaja[0].codigo > 0) {
          let titulo = "Correcto";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
          //modificamos del vector registros, el que acabamos de validar, a traves de la posicion por el TWO DATA BINDING en el componente GESTOR USUARIOS, para modificar el DOM
          this.regService.registros[this.posicion].valido = -1; // el primera variable es el elemento del array (0-n indexado)
          this.registro.valido = -1;
          this.validoToArray();
        } else {
          let titulo = "Error";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
        }
      }).catch((err) => {
        this.mostrarAlerta("No se puede conectar con el servidor", err)
      });
  }

  // verUsuario(idUsuario) {
  //   this.navCtrl.push(UsuarioPage, { idUsuario });
  // }

  presentImage(imagen){
    let img = document.createElement("img");
    img.src = imagen;
    img.id = "picture";
    const imageViewer = this._imageViewerCtrl.create(img);
    imageViewer.present();
  }

  mensajeConfirmar(idRegistro, accion, fab: FabContainer) {
    fab.close();
    let confirm = this.alertCtrl.create({
      title: accion.charAt(0).toUpperCase() + accion.slice(1) + ' Registro',
      message: '¿Esta seguro que desea ' + accion + ' el Registro N° ' + this.registro.idRegistro + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            if (accion == 'validar') {
              this.validarRegistro(idRegistro);

            } else {
              this.invalidarRegistro(idRegistro);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  mostrarAlerta(mensaje, titulo) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Cargando registro. Espere por favor..."
    });
    this.loading.present();
  }


}
