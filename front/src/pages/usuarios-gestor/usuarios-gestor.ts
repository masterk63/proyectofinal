import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  searchTerm: string = '';
  usuarios: any;

  constructor(public navCtrl: NavController,
              public userService: Usuarios,
              private _zone: NgZone){
                // this.userService.load()
                // .then(data => {
                //   this.users = data;                  
                // }) ;

            }

      ionViewDidLoad() {
 
        this.setFilteredItems();
 
    }

    setFilteredItems() {
      this._zone.run(() =>this.usuarios = this.userService.filterItems(this.searchTerm));
    }



}