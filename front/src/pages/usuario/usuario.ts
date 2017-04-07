import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Usuarios} from '../../providers/usuarios';


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

  constructor(public navCtrl: NavController,
              public userService: Usuarios){
                this.userService.load()
                .then(data => {
                  this.users = data;                  
                }) ;

            }


}