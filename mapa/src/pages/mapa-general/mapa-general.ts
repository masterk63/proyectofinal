import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Ubicacion } from '../../providers/ubicacion';
import { ConnectivityService } from '../../providers/connectivityService';
import { ArgumentType } from '@angular/core/src/view';
import { NgSwitchCase } from '@angular/common/src/directives/ng_switch';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { RegistroPage } from '../registro/registro';

declare var google;
declare var MarkerClusterer;
var clusterPintados = new Array();
var cityCircle;

@Component({
  selector: 'page-mapa-general',
  templateUrl: 'mapa-general.html',
  animations: [
    trigger('photosAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-out'),
        style({ transform: 'translateX(-100%)' }),
      ])
    ])
  ]

})
export class MapaGeneralPage {
  markers: any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyA4h0qNqE_K6GuDT5-BH2g2Mx_XcwbLSys';
  public mostrarInfo: boolean = false;
  public imagenInfo: any;
  public usuario: any;
  public fecha: any;
  public alertCtrl: AlertController;
  public idRegistro: any;
  loading: any;
  public verMapa: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _zone: NgZone,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    public connectivityService: ConnectivityService,
    public ubicacionCtrl: Ubicacion) {
    let scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].id == "googleMaps") {
        var googleMapsScript = scripts[i];
      } if (scripts[i].id == "markerclusterer") {
        var clusterMapsScript = scripts[i];
      }
    }
    if (googleMapsScript) {
      document.body.removeChild(googleMapsScript);
    }
    if (clusterMapsScript) {
      document.body.removeChild(clusterMapsScript);
    }
  }

  ionViewDidLoad() {
    this.showLoader('Cargando Mapa...')
    this.loadGoogleMaps();
  }

  public loadGoogleMaps() {
    this.addConnectivityListeners();
    if (typeof google == "undefined" || typeof google.maps == "undefined" || typeof MarkerClusterer == "undefined") {

      console.log("Google maps JavaScript necesita ser cargado.");
      
      if (this.connectivityService.isOnline()) {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey;
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);
          let script2 = document.createElement("script");
          script2.id = "markerclusterer";
          script2.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
          document.body.appendChild(script2);

          //Load the SDK
          window['mapInit'] = () => {
            this.initMap();
            this.enableMap();
          }
          setTimeout(() => {
            this.loadGoogleMaps();
          }, 3000);
        } else if (typeof MarkerClusterer == "undefined") {
          let script2 = document.createElement("script");
          script2.id = "markerclusterer";
          script2.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
          document.body.appendChild(script2);

          //Load the SDK
          window['mapInit'] = () => {
            this.initMap();
            this.enableMap();
          }
          setTimeout(() => {
            this.loadGoogleMaps();
          }, 3000);
        }
      } else{
        console.log("disabling map");
        this.disableMap();
      }
    } else {
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
    this.loading.dismiss();
    this.navCtrl.pop();
  }

  enableMap() {
    console.log("enable map");
  }

  // 

  initMap() {
    google.maps.Map.prototype.getMapScale = function (opt) {
      var circumference = 40075040,
        zoom, lat, scale;

      if (typeof (opt['zoom']) == 'number' && typeof (opt['lat']) == 'number') {
        zoom = opt['zoom'];
        lat = opt['lat'];
      } else {
        zoom = this.getZoom();
        lat = this.getCenter().lat();
      }

      scale = (circumference * Math.cos(lat) / Math.pow(2, zoom + 8));

      if (typeof (opt['precision']) == 'number') {
        scale = Number(scale.toFixed(opt['precision']));
      }

      return scale;
    }

    //Una vez iniciado el mapa, obtengo las coordenadas de mis registros.
    this.ubicacionCtrl.obtenerTodasLasCoordenadas().then((resultado) => {
      this.markers = resultado;
      console.log('mis marcadores', this.markers)
      if (this.markers.length > 0) {
        //Declaro la variable map, de google, no defino Zoom, ni la poscion de centrado
        //ya que se auto calcula, mas adelante, con bounds
        let map = new google.maps.Map(document.getElementById('map'), {
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
        let infowindow = new google.maps.InfoWindow();

        //Me ayuda a que el mapa este siempre centrado, con respecto a todos los puntos 
        // que tengo en mi mapa, osea que siempre tengo visible todos los puntos
        // de mi mapa
        let bounds = new google.maps.LatLngBounds();

        let marcadores = [];
        let arryPosiciones = [];
        let i;

        for (let m of this.markers) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(m.latitud, m.longitud),
            map: map,
            label: '' + m.indice,
            indice: m.indice,
            idRegistro: m.idRegistro,
            usuario: m.usuario,
          });

          marcadores.push(marker);

          arryPosiciones.push(marker.position);

          bounds.extend(marker.position);

          google.maps.event.addListener(marker, 'click', ((marker) => {

            // var content = '<div><img src="data:image/jpeg;base64,' + m.fotoPaisaje + '">' + m.idRegistro + '</div>';
            return () => {
              // infowindow.setContent(content);
              // infowindow.open(map, marker);
              this.usuario = m.usuario;
              this.fecha = m.fecha;
              this.idRegistro = m.idRegistro;
              let fotoPaisaje = 'data:image/jpeg;base64,' + m.fotoPaisaje
              this.imagenInfo = this.sanitizer.bypassSecurityTrustUrl(fotoPaisaje);
              this._zone.run(() => this.mostrarInfo = true);
              console.log(this.mostrarInfo)
            }
          })(marker));
        }


        //definimos la línea
        let linea = new google.maps.Polyline({
          path: arryPosiciones,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        //dibujamos la línea sobre el mapa
        //linea.setMap(map);


        // La opcion de cluster, lo que me hace es mediante IA, agrupar todos los puntos cercanos.
        let clusterOptions = {
          zoomOnClick: false,
          averageCenter: true,
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        }

        let markerCluster = new MarkerClusterer(map, marcadores, clusterOptions);

        //Agrego el evento click al cluster.
        google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
          let markers = cluster.getMarkers();
          let array = [];
          let radio = 0;
          let prom = 0;
          for (let m of markers) {
            array.push(m.idRegistro + '<br>');
            let radioTemp = google.maps.geometry.spherical.computeDistanceBetween(m.position, cluster.getCenter());
            (radio < radioTemp) ? radio = radioTemp : '';
            prom = prom + m.indice;
          }
          radio = Math.round(radio);
          prom = Math.round(prom / markers.length);

          let content = `Se encontraron ` + markers.length + ` registros <br>
                                en un radio de `+ radio + ` metros. <br>
                                Indice promedio: `+ prom;
          infowindow.setContent(content);
          infowindow.setPosition(cluster.getCenter());
          infowindow.open(map);
          let color;
          switch (prom) {
            case 0:
              color = '#BD393C';
              break;
            case 1:
              color = '#CF6D31';
              break;
            case 2:
              color = '#F8F131';
              break;
            case 3:
              color = '#31B353';
              break;
            case 4:
              color = '#3F3470';
              break;
            default:
              break;
          }
          let latlong = cluster.getCenter().lat() + '' + cluster.getCenter().lng();
          let index = clusterPintados.map(c => c.id).indexOf(latlong);
          if (index === -1) {
            cityCircle = new google.maps.Circle({
              strokeColor: color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: color,
              fillOpacity: 0.35,
              map: map,
              center: cluster.getCenter(),
              radius: radio
            });
            let cPintados = {
              circulo: cityCircle,
              id: latlong
            }
            clusterPintados.push(cPintados);
          } else {
            let clusterDelete = clusterPintados.splice(index, 1)[0];
            clusterDelete.circulo.setMap(null);
          }
        });

        //Termino de centrar el mapa
        map.fitBounds(bounds);
      } else {
        this.verMapa = false;
      }
      this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.navCtrl.pop();
    });
  }

  borrarCirculos() {
    cityCircle.setMap(null);
  }

  cerrar() {
    this.mostrarInfo = false;
  }

  mostrarAlerta(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  showLoader(text) {
    this.loading = this.loadingCtrl.create({
      content: text
    });
    this.loading.present();
  }

  public irAlRegistro() {
    this.navCtrl.push(RegistroPage, { idRegistro: this.idRegistro })
  }
}



