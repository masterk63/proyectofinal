import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { UsuariosService } from '../../providers/usuariosService';
import { UsuarioPage } from '../usuario/usuario';
import { MisRegistrosPage } from '../mis-registros/mis-registros';

/*
  Generated class for the UsuariosGestor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-usuarios-gestor',
  templateUrl: 'usuarios-gestor.html'
})
export class UsuariosGestorPage {

  loading:any;
  searchTerm: string ='';
  public usuarios: any; //todos los usuarios devvueltos por el provider
  filtro: string = null; //variable con la que filtramos los usuarios

  constructor(public navCtrl: NavController,
              public userService: UsuariosService,
              public alertCtrl: AlertController,
              public authService: Auth,
              public loadingCtrl: LoadingController,
              ){
                this.cargarUsuarios();

            }

    cargarUsuarios(){
      this.showLoader();
      this.userService.load()
        .then(data => {
          this.usuarios = data;
          this.loading.dismiss();
        }).catch((err)=> {this.loading.dismiss(),
                          this.mostrarAlerta("No se puede conectar con el servidor",err),
                          this.navCtrl.push(MisRegistrosPage);
                        });
    }

    filtrarUsuarios() {
      this.usuarios = this.userService.filterItems(this.searchTerm,this.filtro);
    }

    controlVacio(){
      if(this.filtro == null){
        let mensaje = "Por favor primero debe seleccionar un filtro para realizar la busqueda";
        let titulo = "Filtro necesario";
        this.mostrarAlerta(mensaje, titulo);
      }
    }

    editar(idUsuario,posicion){
      console.log(idUsuario);
      this.navCtrl.push(UsuarioPage,{idUsuario,posicion});
    }

    showLoader(){
    console.log("llamando a loading");
        this.loading = this.loadingCtrl.create({
            content: "Cargando usuarios. Espere por favor..."
        });
        this.loading.present();
    }

    mostrarAlerta(mensaje,titulo) {
      let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: mensaje,
        buttons: ['ACEPTAR']
      });
      alert.present();
    }

    logout(){
      console.log('saliendo logout');
      this.authService.logout().then(()=>{
        console.log('listo borrado, dirijiendo a registrar');
        
        this.navCtrl.setRoot(LoginPage);
      });
    }



}