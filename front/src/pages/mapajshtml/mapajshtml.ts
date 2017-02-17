import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;
 
@Component({
  selector: 'mapajshtml',
  templateUrl: 'mapajshtml.html'
})
export class Mapajshtml {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  centro: any;

  constructor(public navCtrl: NavController) {
    
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
 public loadMap(){

    var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');

      let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      var mapa = new google.maps.Map(document.getElementById('map'), mapOptions);

      let marker = new google.maps.Marker({
      map: mapa,
      animation: google.maps.Animation.DROP,
      position: mapa.getCenter()
    });
  
      let content = "<h4>Information!</h4>";            
      };

    function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options); 
  }

  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.centro
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
 
}

  addInfoWindow(marker, content){
  
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

}