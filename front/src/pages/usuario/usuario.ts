import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { UsuariosService } from '../../providers/usuariosService';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Usuario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage {

  idUsuario: any;
  public usuario: any;
  editar: boolean=false;
  margen: number=275;
  mensajeModificar: any;
  nombre: any;
  apellido: any;
  residencia: any;
  institucion: any;
  grado: any;




  constructor(public navCtrl: NavController,
              public params: NavParams,
              public userService: UsuariosService,
              public storage: Storage,
              public authService: Auth,
              public alertCtrl: AlertController){
                this.idUsuario = this.params.get('idUsuario');
                console.log(this.idUsuario);
                this.dameId();
            } 

  dameId(){

    if(this.idUsuario == null){
      console.log("idUsuario null, buscando desde usuario propio");
    //traemos el id de la variable local guardada en el logueo
      this.storage.get('idUsuario').then((value) => {
          this.idUsuario = value;
          //vamos al provider a que pida en la api el SP de usuario dame con el id
          this.userService.usuarioDame(this.idUsuario)
          .then(data => {
            this.usuario = data;
            this.usuario = this.usuario[0];
          });
      });
    }else{
      console.log("idUsuario existe desde gestor usuarios por PUSH");
        this.userService.usuarioDame(this.idUsuario)
          .then(data => {
            this.usuario = data;
            this.usuario = this.usuario[0];
          });
    }

  }

    logout(){
    console.log('saliendo logout');
    this.authService.logout().then(()=>{
      console.log('listo borrado, dirijiendo a registrar');
      
      this.navCtrl.setRoot(LoginPage);
    });
  }

  botonEditar(){
    //guardo el estado actual de los parametros posibles a modificar
    this.nombre = this.usuario.nombre;
    this.apellido = this.usuario.apellido;
    this.residencia = this.usuario.residencia;
    this.institucion = this.usuario.institucion;
    this.grado = this.usuario.grado;
    //variables para modificar el DOM CSS
    this.editar = !this.editar;
    this.margen = 320;
  }

  botonAceptar(){

      this.userService.usuarioModificar(this.usuario)
      .then(data => {
        this.mensajeModificar = data;
        if(this.mensajeModificar[0].codigo > 0){
          let titulo = "Correcto";
          let mensaje = this.mensajeModificar[0].mensaje;
          this.mostrarAlerta(mensaje,titulo);
          this.editar = !this.editar;
          this.margen = 275;
        }else{
          let titulo = "Error";
           let mensaje = this.mensajeModificar[0].mensaje;
            this.mostrarAlerta(mensaje,titulo);
        }

        }) ;
  }

  botonCancelar(){
    this.usuario.nombre = this.nombre;
    this.usuario.apellido = this.apellido;
    this.usuario.residencia = this.residencia;
    this.usuario.institucion = this.institucion;
    this.usuario.grado = this.grado;

    this.editar = !this.editar;
    this.margen = 275;

  }

    mostrarAlerta(mensaje,titulo) {
      let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: mensaje,
        buttons: ['ACEPTAR']
      });
      alert.present();
    }

    eliminar(){
      console.log("eliminar function");
      console.log(this.idUsuario);
      this.userService.usuarioBaja(this.idUsuario)
      .then(data => {
        this.mensajeModificar = data;
        if(this.mensajeModificar[0].codigo > 0){
          let titulo = "Correcto";
          let mensaje = this.mensajeModificar[0].mensaje;
          this.mostrarAlerta(mensaje,titulo);
          this.editar = !this.editar;
          this.margen = 275;
        }else{
          let titulo = "Error";
           let mensaje = this.mensajeModificar[0].mensaje;
            this.mostrarAlerta(mensaje,titulo);
        }
        });
    }

    confirmarEliminar() {
      console.log("aleterConfirmar");
    let confirm = this.alertCtrl.create({
      title: 'Eliminar Usuario',
      message: '¿Esta seguro que desea eliminar el usuario '+this.usuario.usuario+'?',
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

}