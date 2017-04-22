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

        //Repinta el mapa cuando cambio de pestaña
        google.maps.event.addListenerOnce(mapa, 'idle', function () {
            google.maps.event.trigger(mapa, 'resize');
            mapa.setCenter(latLng);
            mapa.setZoom(15);
        });   
      };

      initialize() {
        var locations = [
            ['DESCRIPTION',-26.8121796,-65.2550263, 3],
            ['DESCRIPTION', 41.914873, 12.506486, 2],
            ['DESCRIPTION', 61.918574, 12.507201, 1]
        ];

        let mapOptions = {
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infowindow = new google.maps.InfoWindow();

        var bounds = new google.maps.LatLngBounds();

        for (let i = 0; i < locations.length; i++) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map
            });

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

        map.fitBounds(bounds);

      /* var listener = google.maps.event.addListener(map, "idle", function () {
            map.setZoom(3);
            google.maps.event.removeListener(listener);
        });*/
    }
}

 