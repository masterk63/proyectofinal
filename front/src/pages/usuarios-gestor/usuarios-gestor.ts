import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import {Usuarios} from '../../providers/usuarios';

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
  searchTerm: string ='';
  public usuarios: any; //todos los usuarios devvueltos por el provider
  filtro: string = null; //variable con la que filtramos los usuarios

  constructor(public navCtrl: NavController,
              public userService: Usuarios,
              public alertCtrl: AlertController,
              ){
                this.cargarUsuarios();

            }

    cargarUsuarios(){
      this.userService.load()
        .then(data => {
          this.usuarios = data;                  
        }) ;
    }

    filtrarUsuarios() {
      this.usuarios = this.userService.filterItems(this.searchTerm,this.filtro);
    }

    controlVacio(){
      if(this.filtro == null){
        this.mostrarAlerta();
      }
    }

    mostrarAlerta(){
        let alert = this.alertCtrl.create({
          title: '¡Filtro necesario!',
          subTitle: 'Por favor primedo debe seleccionar un filtro para realizar la busqueda',
          buttons: ['ACEPTAR']
        });
        alert.present();
    }



}