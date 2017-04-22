import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Injectable()
export class Ubicacion {
  markers:any;

  constructor(public http: Http) {
    console.log('Hello Ubicacion Provider');
  }

  public obtenerCoordenadas(){
  return new Promise((resolve, reject) => {

              var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };
        
          navigator.geolocation.getCurrentPosition(success, error, options);

          function success(pos) {
            var crd = pos.coords;
            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');
            resolve(crd);
          };

          function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
            let resultado = -1;
            resolve(resultado);
          };
    });
  }

    public obtenerTodasLasCoordenadas(){
        return new Promise(resolve => {
        this.http.get('http://rickybruno.sytes.net:3000/api/listarMarkers')
            .map(res => res.json())
            .subscribe(resultado => {
              this.markers = resultado;
              resolve(this.markers);
          });
      });
    }
  
}
