import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController, ActionSheetController, ModalController, Tab } from 'ionic-angular';
import { UsuariosService } from '../../providers/usuariosService';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { Storage } from '@ionic/storage';
import { MisRegistrosPage } from '../mis-registros/mis-registros';
import { ListaRegistrosPage } from '../lista-registros/lista-registros';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camara } from '../../providers/camara';
import { DomSanitizer } from '@angular/platform-browser';
import { CropperPage } from '../cropper/cropper';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage {

  loading: any;
  idUsuario: any;
  public usuario: any;
  editar: boolean = false;
  margen: number = 275;
  nombre: any;
  apellido: any;
  residencia: any;
  institucion: any;
  grado: any;
  infoUsuarios: any;
  formularioUsuario: any;
  submitAttempt: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  fotoCropped: any;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public userService: UsuariosService,
    public storage: Storage,
    public modalCtrl: ModalController,
    public authService: Auth,
    public sanitizer: DomSanitizer,
    public actionSheetCtrl: ActionSheetController,
    public cameraSrv: Camara,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    this.showLoader();
    this.idUsuario = this.params.get('idUsuario');
    this.dameId();
    this.infoUsuarios = 'info';

    this.formularioUsuario = formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      residencia: ['', Validators.compose([Validators.required])],
      institucion: ['', Validators.compose([Validators.required])],
      grado: ['', Validators.compose([Validators.required])],
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccione una opcion',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.subirImagen(1);
          }
        }, {
          text: 'Galeria',
          handler: () => {
            this.subirImagen(0);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',

          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  async subirImagen(source) {
    let fotoPerfil = await this.cameraSrv.takePicture64(source);
    let cropped = await this.openModal(fotoPerfil);
    console.log('​UsuarioPage -> asyncsubirImagen -> cropped', cropped);
    let user = {
      idUsuario: this.idUsuario,
      fotoPerfil: cropped
    }
    this.userService.actilizarFotoPerfil(user).then(res => {
      this.usuario.fotoPerfil = cropped;
    }).catch(err => this.mostrarAlerta(err, 'Error'))
  }

  openModal(pic) {
    return new Promise((resolve, reject) => {
      let modal = this.modalCtrl.create(CropperPage, { imagen: pic, aspectRatio: 1 });
      modal.onDidDismiss(data => {
        return resolve(data);
      });
      modal.present();
    })
  }

  dameId() {
    this.userService.usuarioDame(this.idUsuario)
      .then(data => {
        this.usuario = data;
        this.usuario = this.usuario[0];
        this.formularioUsuario.controls['nombre'].setValue(this.usuario.nombre);
        this.formularioUsuario.controls['apellido'].setValue(this.usuario.apellido);
        this.formularioUsuario.controls['residencia'].setValue(this.usuario.residencia);
        this.formularioUsuario.controls['institucion'].setValue(this.usuario.institucion);
        this.formularioUsuario.controls['grado'].setValue(this.usuario.grado);
        this.fotoCropped = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.usuario.fotoPerfil);
        console.log(this.usuario)
        this.loading.dismiss();
      }).catch((err) => {
        this.loading.dismiss(),
          this.mostrarAlerta("No se puede conectar con el servidor", err),
          this.navCtrl.pop();
      });
  }

  botonEditar() {
    //guardo el estado actual de los parametros posibles a modificar
    this.nombre = this.formularioUsuario.controls.nombre.value;
    this.apellido = this.formularioUsuario.controls.apellido.value;
    this.residencia = this.formularioUsuario.controls.residencia.value;
    this.institucion = this.formularioUsuario.controls.institucion.value;
    this.grado = this.formularioUsuario.controls.grado.value;
    //variables para modificar el DOM CSS
    this.editar = !this.editar;
  }

  botonAceptar() {
    this.usuario.nombre = this.formularioUsuario.controls.nombre.value;
    this.usuario.apellido = this.formularioUsuario.controls.apellido.value;
    this.usuario.residencia = this.formularioUsuario.controls.residencia.value;
    this.usuario.institucion = this.formularioUsuario.controls.institucion.value;
    this.usuario.grado = this.formularioUsuario.controls.grado.value;

    this.userService.usuarioModificar(this.usuario)
      .then(data => {
        let mensajeModificar = data;
        console.log(mensajeModificar)
        if (mensajeModificar[0].codigo > 0) {
          let titulo = "Correcto";
          let mensaje = mensajeModificar[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
          this.editar = !this.editar;
        } else {
          let titulo = "Error";
          let mensaje = mensajeModificar[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
        }

      }).catch((err) => {
        this.mostrarAlerta("No se puede conectar con el servidor", err)
      });
  }

  botonCancelar() {
    this.formularioUsuario.controls['nombre'].setValue(this.nombre);
    this.formularioUsuario.controls['apellido'].setValue(this.apellido);
    this.formularioUsuario.controls['residencia'].setValue(this.residencia);
    this.formularioUsuario.controls['institucion'].setValue(this.institucion);
    this.formularioUsuario.controls['grado'].setValue(this.grado);
    this.editar = !this.editar;
  }

  mostrarAlerta(mensaje, titulo) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  eliminar() {
    console.log("eliminar function");
    console.log(this.idUsuario);
    this.userService.usuarioBaja(this.usuario.idUsuario)
      .then(data => {
        let mensajeBaja = data;
        if (mensajeBaja[0].codigo > 0) {
          let titulo = "Correcto";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
          //eliminamos del vector usuarios, el que acabamos de eliminar, por el TWO DATA BINDING en el componente GESTOR USUARIOS, para modificar el DOM
          let bandera = 0;
          for (let u of this.userService.usuarios) {
            if (u.idUsuario == this.usuario.idUsuario) {
              this.userService.usuarios.splice(bandera, 1); // el primera variable es el elemento del array (0-n indexado)
            } else {
              bandera++;
            }
          }
        } else {
          let titulo = "Error";
          let mensaje = mensajeBaja[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
        }
      }).catch((err) => {
        this.mostrarAlerta("No se puede conectar con el servidor", err)
      });
  }

  confirmarEliminar() {
    console.log("aleterConfirmar");
    let confirm = this.alertCtrl.create({
      title: 'Eliminar Usuario',
      message: '¿Esta seguro que desea eliminar el usuario ' + this.usuario.usuario + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.eliminar();
          }
        }
      ]
    });
    confirm.present();
  }

  showLoader() {
    console.log("llamando a loading");
    this.loading = this.loadingCtrl.create({
      content: "Cargando usuario. Espere por favor..."
    });
    this.loading.present();
  }

  actualizar() {
    if (!this.formularioUsuario.valid) {
      console.log("formulario invalido");
      this.submitAttempt = true;
    } else {
      this.botonAceptar();
    }
  }

}