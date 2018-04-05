import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuariosService } from '../../providers/usuariosService';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { Storage } from '@ionic/storage';
import { MisRegistrosPage } from '../mis-registros/mis-registros';
import { ListaRegistrosPage } from '../lista-registros/lista-registros';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage {

  posicion: any;
  loading: any;
  idUsuario: any;
  public usuario: any;
  editar: boolean = false;
  margen: number = 275;
  mensajeModificar: any;
  nombre: any;
  apellido: any;
  residencia: any;
  institucion: any;
  grado: any;
  infoUsuarios:any;
  formularioUsuario:any;
  submitAttempt:boolean = false;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public userService: UsuariosService,
    public storage: Storage,
    public authService: Auth,
    public formBuilder:FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    this.showLoader();
    // this.posicion = this.params.get('posicion');
    this.idUsuario = this.params.get('idUsuario');
    this.dameId();
    this.infoUsuarios = 'info';

    this.formularioUsuario = formBuilder.group({
      nombre: ['',Validators.compose([Validators.required])],
      apellido: ['',Validators.compose([Validators.required])],
      residencia: ['',Validators.compose([Validators.required])],
      institucion: ['',Validators.compose([Validators.required])],
      grado: ['',Validators.compose([Validators.required])],
    });
  
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
        console.log(this.usuario)
        this.loading.dismiss();
      }).catch((err) => {
        this.loading.dismiss(),
          this.mostrarAlerta("No se puede conectar con el servidor", err),
          this.navCtrl.push(MisRegistrosPage);
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

    this.userService.usuarioModificar(this.usuario)
      .then(data => {
        this.mensajeModificar = data;
        if (this.mensajeModificar[0].codigo > 0) {
          let titulo = "Correcto";
          let mensaje = this.mensajeModificar[0].mensaje;
          this.mostrarAlerta(mensaje, titulo);
          //Modificamos lso cambios tambien en el array de usuarios service para modificar el DOM en la tabla de usuarios del gestor
          this.userService.usuarios[this.posicion].nombre = this.usuario.nombre;
          this.userService.usuarios[this.posicion].apellido = this.usuario.apellido;
          this.editar = !this.editar;
          this.margen = 275;
        } else {
          let titulo = "Error";
          let mensaje = this.mensajeModificar[0].mensaje;
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

  actualizar(){
    if(!this.formularioUsuario.valid){
      console.log("formulario invalido");
        this.submitAttempt = true;
    }else{
      this.botonAceptar();
    }
  }

}