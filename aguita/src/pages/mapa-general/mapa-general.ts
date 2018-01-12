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
                let script2 = document.createElement("script");
                script.id = "googleMaps";

                if (this.apiKey) {
                    script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                } else {
                    script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                }

                document.body.appendChild(script);
                script2.id = "markerclusterer";
                script2.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
                document.body.appendChild(script2);
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

    // 

    initMap() {
        //Una vez iniciado el mapa, obtengo las coordenadas de mis registros.
        this.ubicacionCtrl.obtenerTodasLasCoordenadas().then((resultado) => {
            this.markers = resultado;
            console.log('mis marcadores', this.markers)
            //Declaro la variable map, de google, no defino Zoom, ni la poscion de centrado
            //ya que se auto calcula, mas adelante, con bounds
            var map = new google.maps.Map(document.getElementById('map'), {
                //zoom: 5,
                //center: { lat: -28.024, lng: 140.887 }
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Clase que me permite agregar el PopUp para ver la informacion
            var infowindow = new google.maps.InfoWindow();

            //Me ayuda a que el mapa este siempre centrado, con respecto a todos los puntos 
            // que tengo en mi mapa, osea que siempre tengo visible todos los puntos
            // de mi mapa
            var bounds = new google.maps.LatLngBounds();

            var marcadores = [];
            var i;
            for (let m of this.markers) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(m.latitud, m.longitud),
                    map: map
                });

                marcadores.push(marker);

                bounds.extend(marker.position);


                // google.maps.event.addListener(marker, 'click', (function (marker) {
                //     var content = '<div><img src="data:image/jpeg;base64,' + m.fotoPaisaje + '">' + m.idRegistro + '</div>';
                //     return function () {
                //         infowindow.setContent(content);
                //         infowindow.open(map, marker);
                //     }
                // })(marker));
            }

            // La opcion de cluster, lo que me hace es mediante IA, agrupar todos los puntos cercanos.
            var clusterOptions = {
                zoomOnClick: false,
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            }

            var markerCluster = new MarkerClusterer(map, marcadores, clusterOptions);

            //Agrego el evento click al cluster.
            // google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
            //     var marks_in_cluster = cluster.getMarkers();
            //     console.log(marks_in_cluster);
            //     var content = 'hola';
            //     return function () {
            //         infowindow.setContent(content);
            //         infowindow.setPosition(cluster.getCenter());
            //         infowindow.open(map);
            //     }
            // }(markerCluster));
            google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {

                var markers = cluster.getMarkers();

                var array = [];
                var num = 0;

                for (i = 0; i < markers.length; i++) {
                    num++;
                    array.push(markers[i].getTitle() + '<br>');
                }

                infowindow.setContent(markers.length + " markers<br>" + array);
                infowindow.setPosition(cluster.getCenter());
                infowindow.open(map);
            });

            for (i = 0; i < marcadores.length; i++) {
                var marker = marcadores[i];
                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        infowindow.setContent(this.getTitle());
                        infowindow.open(map, this);
                    }
                })(marker));
            }

            //Termino de centrar el mapa
            map.fitBounds(bounds);
        });
    }
}
