import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ubicacion } from '../../providers/ubicacion';

declare var google;

@Component({
  selector: 'page-mapa-general',
  templateUrl: 'mapa-general.html'
})
export class MapaGeneralPage {
  markers:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public ubicacionCtrl:Ubicacion) {
    
  }

  ionViewDidLoad() {
    this.initialize();
  }

  initialize() {
        this.ubicacionCtrl.obtenerTodasLasCoordenadas().then((resultado) => {

            this.markers = resultado;

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

            for (let m of this.markers) {
                var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(m.latitud, m.longitud),
                  map: map
                });

                bounds.extend(marker.position);
                
                google.maps.event.addListener(marker, 'click', (function (marker) {
                  console.log(m);
                    var content = '<div><img src="data:image/jpeg;base64,'+m.fotoPaisaje+'">'+ m.idRegistro+'</div>';
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker));
            }

            map.fitBounds(bounds);
          }
        );
    }

}