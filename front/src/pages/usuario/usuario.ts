import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  users: any;
  idUsuario: any;
  public usuario: any;

  constructor(public navCtrl: NavController,
              public userService: UsuariosService,
              public storage: Storage,
              public authService: Auth,){
                this.dameId();
            }

  dameId(){
    //traemos el id de la variable local guardada en el logueo
     this.storage.get('idUsuario').then((value) => {
        this.idUsuario = value;
        //vamos al provider a que pida en la api el SP de usuario dame con el id
        this.userService.usuarioDame(this.idUsuario)
        .then(data => {
          this.usuario = data;
          console.log(this.usuario[1]);
        }) ;
    });
  }

    logout(){
    console.log('saliendo logout');
    this.authService.logout().then(()=>{
      console.log('listo borrado, dirijiendo a registrar');
      
      this.navCtrl.setRoot(LoginPage);
    });
  }

}