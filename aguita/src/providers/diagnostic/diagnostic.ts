import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Diagnostic } from '@ionic-native/diagnostic';


@Injectable()
export class DiagnosticProvider {

  constructor(public http: Http,
    private diagnostic: Diagnostic) {

    
    this.diagnostic.isLocationEnabled()
    .then((state) => {
      console.log('isLocationEnabled')
      
      console.log(state);
    }).catch(e => console.error(e));

    this.diagnostic.isLocationAuthorized()
    .then((state) => {
      console.log('isLocationAuthorized')      
      console.log(state);
    }).catch(e => console.error(e));

    this.diagnostic.getLocationAuthorizationStatus()
    .then((state) => {
      console.log('getLocationAuthorizationStatus')      
      
      console.log(state);
    }).catch(e => console.error(e));
    
    this.diagnostic.requestLocationAuthorization()
    .then((state) => {
      console.log('requestLocationAuthorization')      
      
      console.log(state);
    }).catch(e => console.error(e));

  }

}
