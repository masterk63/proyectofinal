import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker,
    GoogleMapsMapTypeId
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
        console.log('latitud', location.lat);
        console.log('longitud', location.lng);
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
            'mapType': GoogleMapsMapTypeId.SATELLITE
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.moveCamara(location);
        });

    }

    pausaCasero(millis) 
    {   
        let date:any;
        let curDate:any;
        date = new Date();
        curDate = null;
        do { curDate = new Date(); } 
        while(curDate-date < millis);
    } 

    moveCamara(location) {
        let options: CameraPosition<object> = {
            target: location,
            //tilt: 0,
            zoom: 15,
            //bearing: 50
        }
        this.map.animateCamera({
            target: location,
            zoom: 15,
            duration: 2500
        });
    }
}



