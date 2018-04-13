import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrosService } from '../../providers/registrosService';
import Registro from '../../models/registro'
import { PopoverController,ViewController } from 'ionic-angular';

@Component({
    template: `
      <ion-list>
        <button ion-item (click)="close()">Validar</button>
        <button ion-item (click)="close()">Invalidar</button>
        <button ion-item (click)="close()">Showcase</button>
        <button ion-item (click)="close()">GitHub Repo</button>
      </ion-list>
    `
  })
  
  export class PopoverPage {
    constructor(public viewCtrl: ViewController) {}
  
    close() {
      this.viewCtrl.dismiss();
    }
  }