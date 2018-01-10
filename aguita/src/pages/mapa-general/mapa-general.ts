import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ubicacion } from '../../providers/ubicacion';
import { ConnectivityService } from '../../providers/connectivityService';

declare var google;
declare var MarkerClusterer;

@Component({
    selector: 'page-mapa-general',
    templateUrl: 'mapa-general.html'
})
export class MapaGeneralPage {
    markers: any;
    mapInitialised: boolean = false;
    apiKey: any = 'AIzaSyA4h0qNqE_K6GuDT5-BH2g2Mx_XcwbLSys';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public connectivityService: ConnectivityService,
        public ubicacionCtrl: Ubicacion) {

    }

    ionViewDidLoad() {
        this.loadGoogleMaps();
    }

    public loadGoogleMaps() {
        this.addConnectivityListeners();
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

            console.log("Google maps JavaScript necesita ser cargado.");
            this.disableMap();

            if (this.connectivityService.isOnline()) {
                console.log("online, loading map");

                //Load the SDK
                window['mapInit'] = () => {
                    this.initMap();
                    this.enableMap();
                }

                let script = document.createElement("script");
                script.id = "googleMaps";
                //let script2 = document.createElement("script");
                //script2.id = "googleMaps";

                if (this.apiKey) {
                    script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                } else {
                    script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                }
                //script2.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
                
                document.body.appendChild(script);
                //document.body.appendChild(script2);

            }
        }
        else {

            if (this.connectivityService.isOnline()) {
                console.log("showing map");
                this.initMap();
                this.enableMap();
            }
            else {
                console.log("disabling map");
                this.disableMap();
            }

        }
    }



    public addConnectivityListeners() {

        let onOnline = () => {

            setTimeout(() => {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {

                    this.loadGoogleMaps();

                } else {

                    if (!this.mapInitialised) {
                        this.initMap();
                    }

                    this.enableMap();
                }
            }, 2000);

        };

        let onOffline = () => {
            this.disableMap();
        };

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);

    }


    disableMap() {
        console.log("disable map");
    }

    enableMap() {
        console.log("enable map");
    }

    initMap() {
        this.ubicacionCtrl.obtenerTodasLasCoordenadas().then((resultado) => {
            this.markers = resultado;
            console.log('Resultados de los marcadores', this.markers)
            let mapOptions = {
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var infowindow = new google.maps.InfoWindow();

            var bounds = new google.maps.LatLngBounds();

            var marcadores = this.markers.map( m => {
                new google.maps.Marker({
                    position: new google.maps.LatLng(m.latitud, m.longitud),
                })
            });

            console.log('mostrando markers',marcadores)

            // var markerCluster = new MarkerClusterer(map, markers,
            //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        

        for (let m of this.markers) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(m.latitud, m.longitud),
                map: map
            });

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker) {
                console.log(m);
                // var content = '<div><img src="data:image/jpeg;base64,' + m.fotoPaisaje + '">' + m.idRegistro + '</div>';
                var content = '<div><img src="data:image/jpeg;base64,' + m.fotoPaisaje + '">' + m.idRegistro + '</div>';
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
