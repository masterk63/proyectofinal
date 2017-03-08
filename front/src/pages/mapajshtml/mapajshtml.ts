import { Component, ViewChild, ElementRef,Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';


declare var google;


@Component({
  selector: 'mapajshtml',
  templateUrl: 'mapajshtml.html'
})
export class Mapajshtml {
  @Input() latitud;
  @Input() longitud;
 
  constructor(public navCtrl: NavController) {

  }
 
  ngOnChanges(){
    this.loadMap();
  }
 
 public loadMap(){
      let latLng = new google.maps.LatLng(this.latitud, this.longitud);
      let mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
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

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
    
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(mapa, marker);
      });          
      };
}