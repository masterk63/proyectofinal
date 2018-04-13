import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as configServer from './../server';

declare var google;

@Injectable()
export class Ubicacion {
  markers: any;

  constructor(public http: Http) {
  }

  public obtenerTodasLasCoordenadas() {
    return new Promise(resolve => {
      this.http.get(configServer.data.urlServidor +'/api/listarMarkers')
        .map(res => res.json())
        .subscribe(resultado => {
          this.markers = resultado;
          resolve(this.markers);
        });
    });
  }

}
