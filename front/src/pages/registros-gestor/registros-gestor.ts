import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { UsuariosService } from '../../providers/usuariosService';
import { UsuarioPage } from '../usuario/usuario';
/*
  Generated class for the RegistrosGestor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registros-gestor',
  templateUrl: 'registros-gestor.html'
})
export class RegistrosGestorPage {

  constructor(public navCtrl: NavController,
              public userService: UsuariosService,
              public alertCtrl: AlertController,
              ){
                  // this.cargarRegistros();
              }

              
    // cargarRegistros(){
    //   this.userService.cargarRegistros()
    //     .then(data => {
    //       this.usuarios = data;
    //     }) ;
    // }

    // filtrarUsuarios() {
    //   this.usuarios = this.userService.filterItems(this.searchTerm,this.filtro);
    // }

    // controlVacio(){
    //   if(this.filtro == null){
    //     this.mostrarAlerta();
    //   }
    // }

    // mostrarAlerta(){
    //     let alert = this.alertCtrl.create({
    //       title: '¡Filtro necesario!',
    //       subTitle: 'Por favor primedo debe seleccionar un filtro para realizar la busqueda',
    //       buttons: ['ACEPTAR']
    //     });
    //     alert.present();
    // }

    // editar(idUsuario){
    //   console.log(idUsuario);
    //   this.navCtrl.push(UsuarioPage,{idUsuario});
    // }



}
