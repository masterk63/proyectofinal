import { Component, Input } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {
   GoogleMap,
   GoogleMapsEvent,
   LatLng,
   CameraPosition,
   MarkerOptions,
   Marker
} from '@ionic-native/google-maps';


@Component({
   selector: 'page-mapasnativo',
   templateUrl: 'mapasnativo.html'
})
export class MapasnativoPage {
   @Input() latitud;
   @Input() longitud;

   map: GoogleMap;

   constructor(public navCtrl: NavController, public platform: Platform) {
      // platform.ready().then(() => {
      //     this.loadMap();
      // });
   }

   ngOnChanges() {

      this.loadMap();
   }

   loadMap() {

      let location = new LatLng(this.latitud, this.longitud);
      console.log(location);
      this.map = new GoogleMap('map', {
         //'backgroundColor': 'white',
         'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            //'zoom': false
         },
         'gestures': {
            'scroll': false,
            'tilt': false,
            'rotate': false,
            'zoom': false
         },
         'camera': {
            //'latLng': location,
            'tilt': 0,
            'zoom': 15,
            'bearing': 50
         }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
         console.log('Map is ready!');
      });

   }
}



