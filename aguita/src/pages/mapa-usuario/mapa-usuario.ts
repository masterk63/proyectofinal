import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ConnectivityService } from '../../providers/connectivityService';
import { Ubicacion } from '../../providers/ubicacion';

declare var google;

@Component({
  selector: 'mapa-usuario',
  templateUrl: 'mapa-usuario.html'
})
export class MapaUsuario {
  @Input() idUsuario;
  markers: any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyA4h0qNqE_K6GuDT5-BH2g2Mx_XcwbLSys';
  cargarGoogle:boolean = true;

  constructor(
    public navCtrl: NavController,
    public ubicacionCtrl: Ubicacion,
    public connectivityService: ConnectivityService) {
      this.navCtrl.viewDidLeave.subscribe(() => {
        console.log('llendome')
       });
  }


  ngOnChanges() {
    this.loadGoogleMaps();
    console.log('cambiando desde el mapa')
    // this.loadMap();
  }

  public loadGoogleMaps() {
    this.addConnectivityListeners();
    if ((typeof google == "undefined" || typeof google.maps == "undefined") && this.cargarGoogle) {

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

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey;
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
        this.cargarGoogle = false;
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
      console.log('mostrando cosas del mapa',resultado)
      this.markers = resultado;

      let mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      let map = new google.maps.Map(document.getElementById('map'), mapOptions);

      let infowindow = new google.maps.InfoWindow();

      let bounds = new google.maps.LatLngBounds();

      for (let m of this.markers) {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(m.latitud, m.longitud),
          map: map
        });

        bounds.extend(marker.position);
      }

      map.fitBounds(bounds);
    }
    );
  }


}

