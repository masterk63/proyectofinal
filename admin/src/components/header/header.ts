import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'headeradmin',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  fotoPerfilURL: any;
  nombre:any;
  apellido:any;

  constructor(public storage: Storage) {
    this.storage.get('user').then(user => {
      this.fotoPerfilURL = 'data:image/png;base64,' + user.fotoPerfil;
      this.nombre = user.nombre;
      this.apellido = user.apellido;
    })
  }
  @Input() titulo: string;
}
